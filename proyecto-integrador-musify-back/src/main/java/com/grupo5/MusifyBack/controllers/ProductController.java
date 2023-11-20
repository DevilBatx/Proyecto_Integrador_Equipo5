package com.grupo5.MusifyBack.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo5.MusifyBack.controllers.exceptions.ProductAlreadyExistsException;
import com.grupo5.MusifyBack.controllers.exceptions.ProductNotFoundException;
import com.grupo5.MusifyBack.dto.ProductDTO;
import com.grupo5.MusifyBack.models.Product;
import com.grupo5.MusifyBack.services.impl.ProductService;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ProductController {

    static Logger logger = LogManager.getLogger(ProductService.class);

    @Autowired
    private ProductService productService;
    @Autowired
    private S3Service s3Service;

    @Autowired
    ObjectMapper mapper;

    @GetMapping("/public/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts(@RequestParam String search) {
        logger.info("Inicio busqueda productos");

        return ResponseEntity.ok(productService.getAllProducts(search));
    }

    @GetMapping("/public/products/random")
    public ResponseEntity<List<ProductDTO>> getRandomProducts() {
        logger.info("Inicio busqueda productos");
        return ResponseEntity.ok(productService.getRandomProducts());
    }


    @PostMapping(value = "/auth/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity<Product> saveProduct(@RequestPart("productInfo") ProductDTO product, @RequestPart("files") MultipartFile[] files) throws ProductAlreadyExistsException {


        if (productService.doesProductExist(product.getName())) {
            throw new ProductAlreadyExistsException("El producto " + product.getName() + " ya se encuentra registrado en la base de datos");
        } else {
            try {
                List<String> imageUrls = null;
                Product savedProduct = productService.saveProduct(product, imageUrls);
                imageUrls = s3Service.uploadFiles(files, String.valueOf(savedProduct.getId()));
                logger.info("Registrando Producto");
                ProductDTO savedProductDTO = mapper.convertValue(savedProduct, ProductDTO.class);
                return ResponseEntity.ok(productService.saveProduct(savedProductDTO, imageUrls));
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }
    }

    @GetMapping("/public/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") long id) {
        logger.info("Incio buesqueda producto por id: " + id);
        return ResponseEntity.ok(productService.getProductById(id));
    }


    @PutMapping(value = "/auth/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity<Product> updateProduct(@RequestPart("productInfo") ProductDTO product, @RequestPart("NewFiles") MultipartFile[] newFiles) throws IOException {
        //Obtengo el producto a modificar
        ProductDTO existingProduct = productService.getProductById(product.getId());
        //Si existe el producto, lo modifico
        if (existingProduct != null) {
            existingProduct.setName(product.getName());
            existingProduct.setDescription(product.getDescription());
            //existingProduct.setBrand(product.getBrand());
            existingProduct.setCategory(product.getCategory());
            //Obtengo las imagenes existentes en el producto
            List<String> newImageUrls = new ArrayList<>();
            //verifica y agrega las imagenes al producto
            //compruebo si newfiles viene vacio
            if(Arrays.stream(newFiles).anyMatch(file -> file.getSize() > 0)){
                newImageUrls = s3Service.uploadFiles(newFiles, String.valueOf(existingProduct.getId()));
            }
            //Guardo el producto modificado
            return ResponseEntity.ok(productService.updateProduct(existingProduct, newImageUrls));
        } else {
            //Si no existe el producto, retorno un error
            throw new ProductNotFoundException("El producto con Id " + product.getId() + " no existe");
        }
    }

    @DeleteMapping("/auth/products")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity<String> deleteProduct(@RequestParam("id") long id) throws IOException {
        logger.info("Eliminando producto");
        //Si se elimina el producto, se retorna un mensaje de exito
        try{
        if (productService.deleteProduct(id)) {
            return ResponseEntity.ok("El producto " + id + " fue eliminado");

        } else {
            //Si no se elimina el producto, se retorna un mensaje de error
            throw new ProductNotFoundException("El producto " + id + " no existe en la base de datos");
        }
        }catch(ProductNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }


}
