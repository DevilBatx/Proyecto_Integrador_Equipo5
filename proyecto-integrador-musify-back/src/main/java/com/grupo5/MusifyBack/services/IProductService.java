package com.grupo5.MusifyBack.services;


import com.grupo5.MusifyBack.dto.SearchProductDTO;
import com.grupo5.MusifyBack.dto.request.SearchRequest;
import com.grupo5.MusifyBack.models.Product;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IProductService {

    List<Product> getAllProducts();
    List<SearchProductDTO>searchProducts(String search);

    Optional<Product> getProductById(long id);

    Product saveProduct(Product product,List<String> imageUrls);

    void updateProduct(Product product, List<String> newImageUrls);

    Boolean deleteProduct(long id) throws IOException;

    List<Product> getRandomProducts(); //     productos aleatorios

    Boolean doesProductExist(String name);
    List<Product> getProductsByCategory(Long idCategory);

    List<Product> searchProduct(SearchRequest search);


}
