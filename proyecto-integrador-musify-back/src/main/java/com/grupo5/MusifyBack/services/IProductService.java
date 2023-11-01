package com.grupo5.MusifyBack.services;

import com.grupo5.MusifyBack.dto.ProductDTO;
import com.grupo5.MusifyBack.models.Product;

import java.util.List;

public interface IProductService {

    List<ProductDTO> getAllProducts();

    ProductDTO getProductById(long id);

    Product saveProduct(ProductDTO product,List<String> imageUrls);

    Product updateProduct(ProductDTO product,List<String> newImageUrls);

    Boolean deleteProduct(long id);

    List<ProductDTO> getRandomProducts(int numberOfProducts); //    X productos aleatorios

    Boolean doesProductExist(String name);


}
