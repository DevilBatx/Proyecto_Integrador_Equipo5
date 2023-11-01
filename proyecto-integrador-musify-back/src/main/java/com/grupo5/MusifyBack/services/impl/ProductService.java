package com.grupo5.MusifyBack.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo5.MusifyBack.dto.ProductDTO;
import com.grupo5.MusifyBack.models.Images;
import com.grupo5.MusifyBack.models.Product;
import com.grupo5.MusifyBack.persistence.repositories.IImageRepository;
import com.grupo5.MusifyBack.persistence.repositories.IProductRepository;
import com.grupo5.MusifyBack.services.IProductService;
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
    public Product saveProduct(ProductDTO productDTO, List<String> imageUrls) {
        // Convierto el DTO a entidad
        Product product = mapper.convertValue(productDTO, Product.class);
        // Guardo el producto en la base de datos
        productRepository.save(product);
        Set<Images> images = new HashSet<>();
        if(product.getImages() == null){
            product.setImages(new HashSet<>());
        }else {
            images = product.getImages();
        }
        // Si el producto viene con imágenes, las guardo en la base de datos
        if (imageUrls != null && !imageUrls.isEmpty()) {
            // A cada imagen le establezco el producto al que pertenece
            for (String imageUrl : imageUrls) {
                Images image = new Images();
                image.setImageUrl(imageUrl);
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
    public Product updateProduct(ProductDTO updatedproductDTO, List<String> newImageUrls) {
        // Convierto el DTO a entidad
        Product updatedproduct = mapper.convertValue(updatedproductDTO, Product.class);
        // Guardo el producto en la base de datos
        productRepository.save(updatedproduct);
        // Si el producto tiene imágenes, las guardo en la base de datos
        if (newImageUrls != null && !newImageUrls.isEmpty()) {
            Set<Images> images = updatedproduct.getImages();
            // A cada imagen le establezco el producto al que pertenece
            for (String imageUrl : newImageUrls) {
                Images image = new Images();
                image.setImageUrl(imageUrl);
                image.setProduct(updatedproduct);
                // Guarda la imagen en la base de datos
                imageRepository.save(image);
                //Agrego la imagen a la lista de imágenes
                images.add(image);
            }
            // Agrego las imágenes al producto
            updatedproduct.setImages(images);
        }

        // Actualiza el producto en la base de datos con las imágenes relacionadas
        return productRepository.save(updatedproduct);
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

    public Boolean doesProductExist(String name) {
        return productRepository.existsByName(name);

    }
}
