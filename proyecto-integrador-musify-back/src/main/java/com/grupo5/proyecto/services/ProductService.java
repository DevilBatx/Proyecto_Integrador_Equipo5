package com.grupo5.proyecto.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo5.proyecto.dto.ProductDTO;
import com.grupo5.proyecto.models.Images;
import com.grupo5.proyecto.models.Product;
import com.grupo5.proyecto.persistence.repositories.IImageRepository;
import com.grupo5.proyecto.persistence.repositories.IProductRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class ProductService implements IProductService {

    static Logger logger = LogManager.getLogger(ProductService.class);

    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IImageRepository imageRepository;
    @Autowired
    ObjectMapper mapper;


    @Override
    public List<ProductDTO> getAllProducts() {
        //Obtener todos los productos
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productsDTO = new ArrayList<>();
        //Convertir los productos a DTO
        for (Product product : products) {

            ProductDTO productDTO = mapper.convertValue(product, ProductDTO.class);
            Set<Images> imagesDTO = new HashSet<>();
            //Convertir las imagenes a DTO
            for (Images image : product.getImages()) {
                Images imageDTO = mapper.convertValue(image, Images.class);
                imagesDTO.add(imageDTO);
            }
            //Establecer las imagenes en el producto
            productDTO.setImages(imagesDTO);
            //Agregar el producto a la lista de productos
            productsDTO.add(productDTO);
        }

        return productsDTO;
    }

    @Override
    public ProductDTO getProductById(long id) {
        //Obtener el producto por id
        Optional<Product> productOptional = productRepository.findById(id);
        ProductDTO productDTO = null;
        //Si existe el producto, lo convierto a DTO
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            productDTO = mapper.convertValue(product, ProductDTO.class);
            Set<Images> imagesDTO = new HashSet<>();
            //Convertir las imagenes a DTO
            for (Images image : product.getImages()) {
                Images imageDTO = mapper.convertValue(image, Images.class);
                imagesDTO.add(imageDTO);
            }
            //Establecer las imagenes en el producto
            productDTO.setImages(imagesDTO);
        }

        return productDTO;

    }


    @Override
    public Product saveProduct(ProductDTO productDTO) {
        // Convierto el DTO a entidad
        Product product = mapper.convertValue(productDTO, Product.class);
        // Guardo el producto en la base de datos
        productRepository.save(product);
        // Si el producto tiene imágenes, las guardo en la base de datos
        if (productDTO.getImages() != null && !productDTO.getImages().isEmpty()) {
            Set<Images> images = new HashSet<>();
            // A cada imagen le establezco el producto al que pertenece
            for (Images image : productDTO.getImages()) {
                image.setProduct(product);
                // Guarda la imagen en la base de datos
                imageRepository.save(image);
                //Agrego la imagen a la lista de imágenes
                images.add(image);
            }
            // Agrego las imágenes al producto
            product.setImages(images);
        }

        // Actualiza el producto en la base de datos con las imágenes relacionadas
        return productRepository.save(product);

    }

    @Override
    public Boolean deleteProduct(long id) {
        //Obtengo el producto por id
        Optional<Product> productOptional = productRepository.findById(id);
        //Si existe el producto, lo elimino
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            productRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<ProductDTO> getRandomProducts(int numberOfProducts) {
        //Obtener X productos random
        List<Product> products = productRepository.findRandomProducts(numberOfProducts);
        List<ProductDTO> productsDTO = new ArrayList<>();
        //Convertir los productos a DTO
        for (Product product : products) {

            ProductDTO productDTO = mapper.convertValue(product, ProductDTO.class);
            Set<Images> imagesDTO = new HashSet<>();
            //Convertir las imagenes a DTO
            for (Images image : product.getImages()) {
                Images imageDTO = mapper.convertValue(image, Images.class);
                imagesDTO.add(imageDTO);
            }
            //Establecer las imagenes en el producto
            productDTO.setImages(imagesDTO);
            //Agregar el producto a la lista de productos
            productsDTO.add(productDTO);
        }

        return productsDTO;
    }
}
