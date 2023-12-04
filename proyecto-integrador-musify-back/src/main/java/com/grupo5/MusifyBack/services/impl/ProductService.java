package com.grupo5.MusifyBack.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo5.MusifyBack.controllers.exceptions.ProductNotFoundException;
import com.grupo5.MusifyBack.dto.ProductDTO;
import com.grupo5.MusifyBack.dto.SearchProductDTO;
import com.grupo5.MusifyBack.models.Characteristic;
import com.grupo5.MusifyBack.models.Image;
import com.grupo5.MusifyBack.models.Product;
import com.grupo5.MusifyBack.persistence.repositories.ICategoryRepository;
import com.grupo5.MusifyBack.persistence.repositories.ICharacteristicRepository;
import com.grupo5.MusifyBack.persistence.repositories.IImageRepository;
import com.grupo5.MusifyBack.persistence.repositories.IProductRepository;
import com.grupo5.MusifyBack.services.IProductService;
import jakarta.transaction.Transactional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;


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
    private ICharacteristicRepository characteristicRepository;
    @Autowired
    private CharacteristicService characteristicService;
    @Autowired
    private S3Service s3Service;
    @Autowired
    ObjectMapper mapper;


    @Override
    public List<Product> getAllProducts() {
        //Obtener todos los productos
        //List<ProductDTO> productsDTO = new ArrayList<>();
        //Convertir los productos a DTO
//        for (Product product : products) {
//
//            ProductDTO productDTO = mapper.convertValue(product, ProductDTO.class);
//            List<Image> imagesDTO = new ArrayList<>();
//            //Convertir las imagenes a DTO
//            for (Image image : product.getImages()) {
//                Image imageDTO = mapper.convertValue(image, Image.class);
//                imagesDTO.add(imageDTO);
//            }
//            //Establecer las imagenes en el producto
//            productDTO.setImages(imagesDTO);
//            //Agregar el producto a la lista de productos
//            productsDTO.add(productDTO);
//        }

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
    @Transactional
    public Product getProductById(long id) {
        //Obtener el producto por id
        Optional<Product> productOptional = productRepository.findById(id);
        //Si existe el producto, lo convierto a DTO
        if (productOptional.isPresent()) {
 //           Product product = productOptional.get();
//            ProductDTO productDTO = mapper.convertValue(product, ProductDTO.class);
           // Set<Image> imagesDTO = new HashSet<>();
            //Setear las imagenes al DTO
//            for (Image image : product.getImages()) {
//                Image imageDTO = mapper.convertValue(image, Image.class);
//                imagesDTO.add(imageDTO);
//            }
            //Establecer las imagenes en el producto
          //  productDTO.setImages(product.getImages());
           //Establecer las caracteristicas en el productoDTO
          //  productDTO.setCharacteristics(product.getCharacteristics());
            return productOptional.get();
        }

        throw new ProductNotFoundException("El producto con id " + id + " no existe en la base de datos");

    }


    @Override
    public Product saveProduct(Product product, List<String> imageUrls) {
        // Convierto el DTO a entidad
        //Product product = mapper.convertValue(productDTO, Product.class);
        // Guardo el producto en la base de datos
        productRepository.save(product);
        List<Image> images = new ArrayList<>();
        if (product.getImages() == null) {
            product.setImages(new ArrayList<>());
        } else {
            images = product.getImages();
        }
        // Si el producto viene con imágenes, las guardo en la base de datos
        if (imageUrls != null && !imageUrls.isEmpty()) {
            // A cada imagen le establezco el producto al que pertenece
            for (String imageUrl : imageUrls) {
                Image image = new Image();
                image.setImageUrl(imageUrl);
                image.setProduct(product);
                // Guarda la imagen en la base de datos
                imageRepository.save(image);
                //Agrego la imagen a la lista de imágenes
                images.add(image);
            }
            // Agrego las imágenes al producto
            product.setImages(images);
            //Agrego el producto a la entidad categoría
            if (product.getCategory().getProducts() == null) {
                product.getCategory().setProducts(new ArrayList<>());
            }
            List<Product> products = product.getCategory().getProducts();
            products.add(product);
            product.getCategory().setProducts(products);
            categoryRepository.save(product.getCategory());

//            //Agrego el producto a las caracteristicas
//            productDTO.getCharacteristics().forEach(characteristic -> {
//                characteristic.getProducts().add(product);
//                characteristicRepository.save(characteristic);
//            });
            //Agrego las caracteristicas al producto
            product.setCharacteristics(product.getCharacteristics());


        }

        // Actualiza el producto en la base de datos con las imágenes relacionadas
        return productRepository.save(product);

    }

    @Override
    public Product updateProduct(Product updatedproduct, List<String> newImageUrls) {
        // Convierto el DTO a entidad
        //Product updatedproduct = mapProductDTOToProduct(updatedproductDTO);
        // Guardo el producto en la base de datos
        //productRepository.save(updatedproduct);
        // Si el producto tiene imágenes, las guardo en la base de datos
        if (newImageUrls != null && !newImageUrls.isEmpty()) {
            List<Image> images = updatedproduct.getImages();
            // A cada imagen le establezco el producto al que pertenece
            for (String imageUrl : newImageUrls) {
                Image image = new Image();
                image.setImageUrl(imageUrl);
                image.setProduct(updatedproduct);
                // Guarda la imagen en la base de datos
                imageRepository.save(image);
                //Agrego la imagen a la lista de imágenes
                images.add(image);
            }
            // Agrego las imágenes al producto
            updatedproduct.setImages(images);
            //Agrego el producto a la entidad categoría
            categoryService.addProductToCategory(updatedproduct.getCategory().getId(), updatedproduct.getId());
            //Agrego el producto a las caracteristicas

//            updatedproductDTO.getCharacteristics().forEach(characteristic -> {
//                characteristicService.addProductToCharacteristic(characteristic.getId(), updatedproduct.getId());
//            });
            //Agrego las caracteristicas al producto
            //updatedproduct.setCharacteristics(updatedproductDTO.getCharacteristics());

        }

        // Actualiza el producto en la base de datos con las imágenes relacionadas
            return productRepository.save(updatedproduct);
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

    public Product mapProductDTOToProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setId(productDTO.getId());
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setCategory(productDTO.getCategory());
        product.setCharacteristics(productDTO.getCharacteristics());

        // Procesamiento manual de las imágenes
        List<Image> images = new ArrayList<>();

        for (Image image : productDTO.getImages()) {
            Image img = new Image();
            img.setImageUrl(image.getImageUrl());
            img.setImageOrder(image.getImageOrder());
            img.setProduct(image.getProduct());
            images.add(image);
        }

        product.setImages(images);
//        // Procesamiento manual de las Caracteristicas
//        Set<Characteristic> characteristics = new HashSet<>();
//        for (Characteristic characteristic : productDTO.getCharacteristics()) {
//            Characteristic charac = new Characteristic();
//            charac.setId(characteristic.getId());
//            charac.setName(characteristic.getName());
//            charac.setIconUrl(characteristic.getIconUrl());
//            charac.setProducts(characteristic.getProducts());
//            characteristics.add(charac);
//        }
//        product.setCharacteristics(characteristics);
        return product;
    }

}
