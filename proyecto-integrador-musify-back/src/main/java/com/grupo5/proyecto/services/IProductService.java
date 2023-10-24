package com.grupo5.proyecto.services;

import com.grupo5.proyecto.dto.ProductDTO;
import com.grupo5.proyecto.models.Product;

import java.util.List;

public interface IProductService {

    List<ProductDTO> getAllProducts();

    ProductDTO getProductById(long id);

    Product saveProduct(ProductDTO product);

    Boolean deleteProduct(long id);

    List<ProductDTO> getRandomProducts(int numberOfProducts); //    X productos aleatorios


}
