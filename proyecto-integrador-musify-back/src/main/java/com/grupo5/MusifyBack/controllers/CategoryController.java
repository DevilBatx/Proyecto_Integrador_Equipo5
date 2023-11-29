package com.grupo5.MusifyBack.controllers;

import com.grupo5.MusifyBack.controllers.exceptions.CategoryAlreadyExistsException;
import com.grupo5.MusifyBack.controllers.exceptions.CategoryNotFoundException;
import com.grupo5.MusifyBack.models.Category;
import com.grupo5.MusifyBack.services.impl.CategoryService;
import com.grupo5.MusifyBack.services.impl.S3Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class CategoryController {
    static Logger logger = LogManager.getLogger(CategoryService.class);
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private S3Service s3Service;

    @GetMapping("/public/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        logger.info("Inicio busqueda categorias");
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/public/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") Long id) {
        logger.info("Inicio busqueda categoria por id");
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PostMapping(value = "/auth/categories", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity<Category> saveCategory(@RequestPart("categoryInfo") Category category, @RequestPart("files") MultipartFile[] files) throws CategoryAlreadyExistsException {
       //si Category viene vacio lanzo bad request
        if (category == null || category.getName() == "") {
            return ResponseEntity.badRequest().build();
        }
        //Si la categoria ya existe, lanzo excepcion
        if (categoryService.doesCategoryExist(category.getName())) {
            throw new CategoryAlreadyExistsException("La categoria " + category.getName() + " ya se encuentra registrada en la base de datos");
        }
        //Si no existe, la creo
        logger.info("Inicio creacion categoria");
        try {
            List<String> images = s3Service.uploadFiles(files, "categories");
            category.setUrl(images.get(0));
            return ResponseEntity.ok(categoryService.saveCategory(category));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/auth/categories", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity<Category> updateCategory(@RequestPart("categoryInfo") Category category, @RequestPart(value="newFile", required = false) MultipartFile[] newFiles) {
        //Busco la categoria en la base de datos y la uso para actualizarle los datos nuevos
        Category existingCategory = categoryService.getCategoryById(category.getId());
        //Si no existe, lanzo excepcion
        if (existingCategory == null) {
            throw new CategoryNotFoundException("La categoria " + category.getName() + " no se encuentra registrada en la base de datos");
        }
        //Si existe, actualizo los datos
        logger.info("Inicio actualizacion categoria");
        existingCategory.setName(category.getName());
        //Si se subieron nuevas imagenes, las subo a S3 y actualizo la url
        if (newFiles != null && Arrays.stream(newFiles).anyMatch(file -> file.getSize() > 0)) {
            try {
                List<String> images = s3Service.uploadFiles(newFiles, "categories");
                if(existingCategory.getUrl() != null) {
                    s3Service.deleteFiles(List.of(existingCategory.getUrl()), "categories");
                }
                existingCategory.setUrl(images.get(0));
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.ok(categoryService.updateCategory(existingCategory));
    }

    @DeleteMapping("/auth/categories/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity<?> deleteCategory(@PathVariable("id") Long id) {
        logger.info("Inicio eliminacion categoria");
        try {
        categoryService.deleteCategory(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Category deleted successfully");
        return ResponseEntity.ok().body(response);
        } catch (IllegalStateException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());

            // Devolver una respuesta con el Map convertido a JSON automáticamente por Spring
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
    }
}

