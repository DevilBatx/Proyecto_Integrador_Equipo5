package com.grupo5.MusifyBack.services;

import com.grupo5.MusifyBack.models.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategories();
    Category getCategoryById(Long id);
    Category saveCategory(Category category);
    Category updateCategory(Category category);
    void deleteCategory(Long id);
    void addProductToCategory(Long idCategory, Long idProduct);
}
