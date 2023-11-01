package com.grupo5.MusifyBack.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo5.MusifyBack.controllers.exceptions.ProductAlreadyExistsException;
import com.grupo5.MusifyBack.dto.ProductDTO;
import com.grupo5.MusifyBack.models.Images;
import com.grupo5.MusifyBack.models.Product;
import com.grupo5.MusifyBack.services.impl.ProductService;
import com.grupo5.MusifyBack.services.impl.S3Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        logger.info("Inicio busqueda productos");
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/products/random")
    public ResponseEntity<List<ProductDTO>> getRandomProducts(@RequestParam("numberOfProducts") int numberOfProducts) {
        logger.info("Inicio busqueda productos");
        return ResponseEntity.ok(productService.getRandomProducts(numberOfProducts));
    }

    @PostMapping(value = "/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> saveProduct(@RequestPart("productInfo") ProductDTO product, @RequestPart("files") MultipartFile[] files) throws ProductAlreadyExistsException {


        if (productService.doesProductExist(product.getName())) {
            throw new ProductAlreadyExistsException("El producto " + product.getName() + " ya se encuentra registrado en la base de datos");
        } else {
            try {
                List<String> imageUrls = null;
                Product savedProduct = productService.saveProduct(product, imageUrls);
                imageUrls = s3Service.uploadFiles(files, savedProduct.getId());
                logger.info("Registrando Producto");
                ProductDTO savedProductDTO = mapper.convertValue(savedProduct, ProductDTO.class);
                return ResponseEntity.ok(productService.saveProduct(savedProductDTO, imageUrls));
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") long id) {
        logger.info("Incio buesqueda producto por id: " + id);
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PutMapping(value = "/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> updateProduct(@RequestPart("productInfo") ProductDTO product, @RequestPart("NewFiles") MultipartFile[] newFiles) throws IOException {
        //Obtengo el producto a modificar
        ProductDTO existingProduct = productService.getProductById(product.getId());
        //Si existe el producto, lo modifico
        if (existingProduct != null) {
            existingProduct.setName(product.getName());
            existingProduct.setDescription(product.getDescription());
            //existingProduct.setBrand(product.getBrand());
            //existingProduct.setCategory(product.getCategory());
            //Obtengo las imagenes existentes en el producto
            Set<Images> existingImages = existingProduct.getImages();
            List<String> newImageUrls = new ArrayList<>();
            //verifica y agrega las imagenes al producto
            if (newFiles != null && newFiles.length > 0) {
                newImageUrls = s3Service.uploadFiles(newFiles, existingProduct.getId());
//              Product savedProduct = mapper.convertValue(existingProduct, Product.class);
//                for (String imageUrl : newImageUrls) {
//                    Images image = new Images();
//                    image.setImageUrl(imageUrl);
//                    image.setProduct(savedProduct);
//
//                    existingImages.add(image);
//                }
//                existingProduct.setImages(existingImages);
            }
            //existingProduct.setImages(product.getImages());
            //Guardo el producto modificado
            return ResponseEntity.ok(productService.saveProduct(existingProduct, newImageUrls));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/products")
    public ResponseEntity<String> deleteProduct(@RequestParam("id") long id) {
        logger.info("Eliminando producto");
        //Si se elimina el producto, se retorna un mensaje de exito
        if (productService.deleteProduct(id)) {
            return ResponseEntity.ok("El producto " + id + " fue eliminado");

        } else {
            //Si no se elimina el producto, se retorna un mensaje de error
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Producto no encontrado");
        }

    }


}
