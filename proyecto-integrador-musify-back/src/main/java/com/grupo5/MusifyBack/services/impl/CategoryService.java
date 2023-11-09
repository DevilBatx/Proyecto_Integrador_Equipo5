package com.grupo5.MusifyBack.services.impl;

import com.grupo5.MusifyBack.controllers.exceptions.CategoryAlreadyExistsException;
import com.grupo5.MusifyBack.controllers.exceptions.CategoryNotFoundException;
import com.grupo5.MusifyBack.models.Category;
import com.grupo5.MusifyBack.persistence.repositories.ICategoryRepository;
import com.grupo5.MusifyBack.services.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository categoryRepository;

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
        Optional<Category> categoryOpional = categoryRepository.findById(id);
        if (categoryOpional.isPresent()) {
            categoryRepository.delete(categoryOpional.get());
        } else {
            throw new CategoryNotFoundException("Category not found " + id );
        }

    }
}
