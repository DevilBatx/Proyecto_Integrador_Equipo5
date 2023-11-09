package com.grupo5.MusifyBack.controllers;

import com.grupo5.MusifyBack.models.Category;
import com.grupo5.MusifyBack.services.impl.CategoryService;
import com.grupo5.MusifyBack.services.impl.ProductService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CategoryController {
    static Logger logger = LogManager.getLogger(CategoryService.class);
    @Autowired
    private CategoryService categoryService;

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

    @PostMapping("/auth/categories")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Category> saveCategory(@RequestBody Category category) {
        logger.info("Inicio creacion categoria");
        return ResponseEntity.ok(categoryService.saveCategory(category));
    }

    @PutMapping("/auth/categories")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
        logger.info("Inicio actualizacion categoria");
        return ResponseEntity.ok(categoryService.updateCategory(category));
    }
    @DeleteMapping("/auth/categories/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") Long id) {
        logger.info("Inicio eliminacion categoria");
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().body("Category deleted successfully");
    }
}

