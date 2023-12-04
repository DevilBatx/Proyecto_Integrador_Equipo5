package com.grupo5.MusifyBack.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo5.MusifyBack.controllers.exceptions.CategoryNotFoundException;
import com.grupo5.MusifyBack.models.Characteristic;
import com.grupo5.MusifyBack.models.Product;
import com.grupo5.MusifyBack.persistence.repositories.ICharacteristicRepository;
import com.grupo5.MusifyBack.persistence.repositories.IProductRepository;
import com.grupo5.MusifyBack.services.ICharacteristicService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CharacteristicService implements ICharacteristicService {
    @Autowired
    ICharacteristicRepository characteristicRepository;
    @Autowired
    private IProductRepository productRepository;
    @Autowired
    private S3Service s3Service;
    @Autowired
    ObjectMapper mapper;
    @Override
    @Transactional
    public List<com.grupo5.MusifyBack.models.Characteristic> getAllCharacteristics() {
       return characteristicRepository.findAll();
    }

    @Override
    @Transactional
    public com.grupo5.MusifyBack.models.Characteristic getCharacteristicById(Long id) {
        Optional<com.grupo5.MusifyBack.models.Characteristic> characteristicOptional = characteristicRepository.findById(id);

        return characteristicOptional.orElseThrow(() ->
                new CategoryNotFoundException("Characteristic not found " + id));
    }

    @Override
    @Transactional
    public com.grupo5.MusifyBack.models.Characteristic saveCharacteristic(com.grupo5.MusifyBack.models.Characteristic characteristic) {
        Optional<com.grupo5.MusifyBack.models.Characteristic> characteristicOpional = characteristicRepository.findByName(characteristic.getName());
        if (characteristicOpional.isPresent()) {
            throw new CategoryNotFoundException("Characteristic already exist " + characteristic.getName());
        }

        return characteristicRepository.save(characteristic);
    }

    @Override
    @Transactional
    public com.grupo5.MusifyBack.models.Characteristic updateCharacteristic(com.grupo5.MusifyBack.models.Characteristic characteristic) {
        Optional<com.grupo5.MusifyBack.models.Characteristic> characteristicOpional = characteristicRepository.findById(characteristic.getId());
        if (characteristicOpional.isPresent()) {
            characteristic.setProducts(characteristicOpional.get().getProducts());
            return characteristicRepository.save(characteristic);
        }
        throw new CategoryNotFoundException("Characteristic not found " + characteristic.getId());
    }

    @Override
    @Transactional
    public void deleteCharacteristic(Long id) {
        Optional<com.grupo5.MusifyBack.models.Characteristic> characteristic = characteristicRepository.findById(id);
        if (characteristic.isPresent()) {
            characteristicRepository.deleteById(id);
        } else {
            throw new CategoryNotFoundException("Characteristic not found " + id);
        }
    }

    @Override
    @Transactional
    public void addProductToCharacteristic(Long idCharacteristic, Long idProduct) {
        Optional<com.grupo5.MusifyBack.models.Characteristic> characteristicOptional = characteristicRepository.findById(idCharacteristic);
        Optional<Product> productOptional = productRepository.findById(idProduct);
        if (characteristicOptional.isPresent() && productOptional.isPresent()) {
            com.grupo5.MusifyBack.models.Characteristic characteristic = characteristicOptional.get();
            Product product = productOptional.get();
            List<Product> Products = characteristic.getProducts();
            List<Characteristic> characteristics = product.getCharacteristics();
            Products.add(product);

            characteristics.add(mapper.convertValue(characteristic, Characteristic.class));
            characteristicRepository.save(characteristic);
            productRepository.save(product);
        } else {
            throw new CategoryNotFoundException("Characteristic " + idCharacteristic + " or Product " + idProduct + " not found");
        }
    }

    public boolean doesCharacteristicExist(String name) {
        Optional<com.grupo5.MusifyBack.models.Characteristic> characteristic = characteristicRepository.findByName(name);
        return characteristic.isPresent();
    }
}
