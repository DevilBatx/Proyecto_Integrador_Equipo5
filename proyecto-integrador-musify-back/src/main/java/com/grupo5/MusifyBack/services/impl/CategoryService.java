package com.grupo5.MusifyBack.services.impl;

import com.grupo5.MusifyBack.controllers.exceptions.CategoryAlreadyExistsException;
import com.grupo5.MusifyBack.controllers.exceptions.CategoryNotFoundException;
import com.grupo5.MusifyBack.models.Category;
import com.grupo5.MusifyBack.models.Product;
import com.grupo5.MusifyBack.persistence.repositories.ICategoryRepository;
import com.grupo5.MusifyBack.persistence.repositories.IProductRepository;
import com.grupo5.MusifyBack.services.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository categoryRepository;
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private S3Service s3Service;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            return category.get();
        }
        throw new CategoryNotFoundException("Category not found " + id );
    }

    @Override
    public Category saveCategory(Category category) {
        Optional<Category> categoryOpional = categoryRepository.findByName(category.getName());
        if (categoryOpional.isPresent()) {
            throw new CategoryAlreadyExistsException("Category already exist " + category.getName());
        }

        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        Optional<Category> categoryOpional = categoryRepository.findById(category.getId());
        if (categoryOpional.isPresent()) {
            category.setProducts(categoryOpional.get().getProducts());
            return categoryRepository.save(category);
        }
        throw new CategoryNotFoundException("Category not found " + category.getId());
    }

    @Override
    public void deleteCategory(Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            try{
            Category category = categoryOptional.get();

            // Verificar si hay productos asociados a la categoría
            if(!productRepository.findProductsByCategories_Id(id).isEmpty()) {
                throw new IllegalStateException("No es posible eliminar la categoría porque tiene productos asociados.");
            }
            categoryRepository.delete(categoryOptional.get());
            //Elimino la imagen de la categoria
            s3Service.deleteFiles(List.of(category.getUrl()), "categories");
            }catch (Exception e){
                throw new IllegalStateException("No es posible eliminar la categoría porque tiene productos asociados.");
            }
        } else {
            throw new CategoryNotFoundException("Category not found " + id );
        }

    }

    @Override
    public void addProductToCategory(Long idCategory, Long idProduct) {
        Optional<Category> categoryOpional = categoryRepository.findById(idCategory);
        if (categoryOpional.isPresent()) {
            Category category = categoryOpional.get();
            Product product = productRepository.findById(idProduct).get();
            Set<Product> products = category.getProducts();
            products.add(product);
            categoryRepository.save(category);
        } else {
            throw new CategoryNotFoundException("Category not found " + idCategory );
        }
    }

    public boolean doesCategoryExist(String name) {
        Optional<Category> category = categoryRepository.findByName(name);
        return category.isPresent();
    }
}
