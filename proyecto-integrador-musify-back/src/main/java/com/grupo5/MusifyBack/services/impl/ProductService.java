package com.grupo5.MusifyBack.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo5.MusifyBack.dto.SearchProductDTO;
import com.grupo5.MusifyBack.dto.request.SearchRequest;
import com.grupo5.MusifyBack.models.Image;
import com.grupo5.MusifyBack.models.Product;
import com.grupo5.MusifyBack.persistence.repositories.ICategoryRepository;
import com.grupo5.MusifyBack.persistence.repositories.IImageRepository;
import com.grupo5.MusifyBack.persistence.repositories.IProductRepository;
import com.grupo5.MusifyBack.services.IProductService;
import jakarta.transaction.Transactional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ProductService implements IProductService {

    static Logger logger = LogManager.getLogger(ProductService.class);

    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private IImageRepository imageRepository;
    @Autowired
    private ICategoryRepository categoryRepository;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private S3Service s3Service;
    @Autowired
    ObjectMapper mapper;


    @Override
    public List<Product> getAllProducts() {
        //Obtener todos los productos
        return productRepository.findAll();
    }

    @Override
    public List<SearchProductDTO> searchProducts(String search) {
        List<Product> products = productRepository.findProductsBySearchString(search);
        List<SearchProductDTO> productsDTO = new ArrayList<>();
        //Convertir los productos a DTO
        for (Product product : products) {
            SearchProductDTO productDTO = mapper.convertValue(product, SearchProductDTO.class);
            //Agregar el producto a la lista de productos
            productsDTO.add(productDTO);
        }
        return productsDTO;
    }

    @Override
    public Optional<Product> getProductById(long id) {
        return productRepository.findById(id);
    }


    @Override
    public Product saveProduct(Product product, List<String> imageUrls) {
        List<Image> images = new ArrayList<>();
        // Si el producto viene con imágenes, las guardo en la base de datos
        if (imageUrls != null && !imageUrls.isEmpty()) {
            // A cada imagen le establezco el producto al que pertenece
            imageUrls.forEach(imageUrl -> {
                Image image = new Image();
                image.setImageUrl(imageUrl);
                image.setProduct(product);
                // Guarda la imagen en la base de datos
                imageRepository.save(image);
                //Agrego la imagen a la lista de imágenes
                images.add(image);
            });
            // Agrego las imágenes al producto
            product.setImages(images);
        }
        // Actualiza el producto en la base de datos con las imágenes relacionadas
        return productRepository.save(product);

    }

    @Override
    @Transactional
    public void updateProduct(Product updatedproduct, List<String> newImageUrls) {
        // Si el producto tiene imágenes, las guardo en la base de datos
        List<Image> images = updatedproduct.getImages();
        if (newImageUrls != null && !newImageUrls.isEmpty()) {
            // A cada imagen le establezco el producto al que pertenece
            newImageUrls.forEach(imageUrl -> {
                Image image = new Image();
                image.setImageUrl(imageUrl);
                image.setProduct(updatedproduct);
                // Guarda la imagen en la base de datos
                imageRepository.save(image);
                //Agrego la imagen a la lista de imágenes
                images.add(image);
            });
            // Agrego las imágenes al producto
            updatedproduct.setImages(images);
        }
        // Actualiza el producto en la base de datos con las imágenes relacionadas
        productRepository.save(updatedproduct);
    }

    @Override
    public Boolean deleteProduct(long id) throws IOException {
        //Obtengo el producto por id
        Optional<Product> productOptional = productRepository.findById(id);
        //Si existe el producto, lo elimino
        if (productOptional.isPresent()) {
            try {
                List<String> imageUrls = new ArrayList<>();
                Product product = productOptional.get();
                //Obtengo las imagenes del producto
                List<Image> images = product.getImages();
                //Obtengo las urls de las imagenes
                for (Image image : images) {
                    imageUrls.add(image.getImageUrl());
                }
                //Elimino las imagenes de S3
                s3Service.deleteFiles(imageUrls, String.valueOf(id));
                productRepository.deleteById(id);
                return true;
            } catch (Exception e) {
                throw new IOException(e.getMessage());
            }
        } else {
            //Si no existe el producto, retorno false
            return false;
        }
    }

    @Override
    public List<Product> getRandomProducts() {
        //Obtener X productos random
        return productRepository.findRandomProducts();
    }

    public Boolean doesProductExist(String name) {
        return productRepository.existsByName(name);

    }

    @Override
    public List<Product> getProductsByCategory(Long idCategory) {
        //Obtener todos los productos de una categoria
        return productRepository.findProductsByCategories_Id(idCategory);

    }

    @Override
    public List<Product> searchProduct(SearchRequest search) {
        return productRepository.findProductByDateRange(search.getWord(), search.getStartDate(), search.getEndDate());

    }


}
