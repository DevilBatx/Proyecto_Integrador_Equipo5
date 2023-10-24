package com.grupo5.proyecto.controllers;

import com.grupo5.proyecto.dto.ProductDTO;
import com.grupo5.proyecto.models.Product;
import com.grupo5.proyecto.services.ProductService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ProductController {

    static Logger logger = LogManager.getLogger(ProductService.class);

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts(){
        logger.info("Inicio busqueda productos");
        return ResponseEntity.ok(productService.getAllProducts());
    }
    @GetMapping("/products/random")
    public ResponseEntity<List<ProductDTO>> getRandomProducts(@RequestParam("numberOfProducts") int numberOfProducts){
        logger.info("Inicio busqueda productos");
        return ResponseEntity.ok(productService.getRandomProducts(numberOfProducts));
    }
    @PostMapping("/products")
    public ResponseEntity<Product> saveProduct(@RequestBody ProductDTO product){
        logger.info("Registrando Producto");
        return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.CREATED);
    }
    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") long id){
        logger.info("Incio buesqueda producto por id: " + id);
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PutMapping("/products")
    public ResponseEntity<Product> updateProduct( @RequestBody ProductDTO product){
        //Obtengo el producto a modificar
        ProductDTO existingProduct = productService.getProductById(product.getId());
        //Si existe el producto, lo modifico
        if (existingProduct != null) {
            existingProduct.setName(product.getName());
            existingProduct.setDescription(product.getDescription());
            //existingProduct.setBrand(product.getBrand());
            //existingProduct.setCategory(product.getCategory());
            existingProduct.setImages(product.getImages());
        //Guardo el producto modificado
            return ResponseEntity.ok(productService.saveProduct(existingProduct));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/products")
    public ResponseEntity<String> deleteProduct(@RequestParam("id") long id){
        logger.info("Eliminando producto");
        //Si se elimina el producto, se retorna un mensaje de exito
        if (productService.deleteProduct(id)){
            return ResponseEntity.ok("El producto " + id + " fue eliminado");

        } else {
            //Si no se elimina el producto, se retorna un mensaje de error
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
        }

    }


}
