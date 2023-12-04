package com.grupo5.MusifyBack.services;

import com.grupo5.MusifyBack.dto.ProductDTO;
import com.grupo5.MusifyBack.dto.SearchProductDTO;
import com.grupo5.MusifyBack.models.Product;

import java.io.IOException;
import java.util.List;

public interface IProductService {

    List<Product> getAllProducts();
    List<SearchProductDTO>searchProducts(String search);

    Product getProductById(long id);

    Product saveProduct(Product product,List<String> imageUrls);

    Product updateProduct(Product product,List<String> newImageUrls);

    Boolean deleteProduct(long id) throws IOException;

    List<Product> getRandomProducts(); //    X productos aleatorios

    Boolean doesProductExist(String name);
    List<Product> getProductsByCategory(Long idCategory);


}
