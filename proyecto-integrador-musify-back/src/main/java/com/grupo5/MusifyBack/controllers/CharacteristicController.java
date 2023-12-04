package com.grupo5.MusifyBack.controllers;

import com.grupo5.MusifyBack.controllers.exceptions.CategoryAlreadyExistsException;
import com.grupo5.MusifyBack.controllers.exceptions.CategoryNotFoundException;
import com.grupo5.MusifyBack.models.Characteristic;
import com.grupo5.MusifyBack.services.impl.CategoryService;
import com.grupo5.MusifyBack.services.impl.CharacteristicService;
import com.grupo5.MusifyBack.services.impl.S3Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class CharacteristicController {
    static Logger logger = LogManager.getLogger(CategoryService.class);
    @Autowired
    private CharacteristicService characteristicService;
    @Autowired
    private S3Service s3Service;

    @GetMapping("/public/characteristics")
    public ResponseEntity<List<Characteristic>> getAllCharacteristics() {
        logger.info("Inicio busqueda caracteristicas");
        try {
            return ResponseEntity.ok(characteristicService.getAllCharacteristics());
        } catch (Exception e) {
            logger.error("Error al buscar caracteristicas", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/public/characteristics/{id}")
    public ResponseEntity<Characteristic> getCharacteristicById(@PathVariable("id") Long id) {
        logger.info("Inicio busqueda caracteristica por id");
        try {
            return ResponseEntity.ok(characteristicService.getCharacteristicById(id));
        } catch (CategoryNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping(value = "/auth/characteristics", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity<Characteristic> saveCharacteristic(@RequestPart("characteristicInfo") Characteristic characteristic, @RequestPart("file") MultipartFile[] file) throws CategoryAlreadyExistsException {
        //si Characteristic viene vacio lanzo bad request
        if (characteristic == null || Objects.equals(characteristic.getName(), "")) {
            return ResponseEntity.badRequest().build();
        }
        //Si la categoria ya existe, lanzo excepcion
        if (characteristicService.doesCharacteristicExist(characteristic.getName())) {
            throw new CategoryAlreadyExistsException("La caracteristica " + characteristic.getName() + " ya se encuentra registrada en la base de datos");
        }
        //Si no existe, la creo
        logger.info("Inicio creacion caracteristica");
        try {
            List<String> images = s3Service.uploadFiles(file, "characteristics");
            characteristic.setIconUrl(images.get(0));
            return ResponseEntity.ok(characteristicService.saveCharacteristic(characteristic));
        } catch (Exception e) {
            logger.error("Error al crear caracteristica", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/auth/characteristics", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity<Characteristic> updateCharacteristic(@RequestPart("characteristicInfo") Characteristic characteristic, @RequestPart(value = "newFile", required = false) MultipartFile[] newFile) throws CategoryAlreadyExistsException {
        //Busco la CARACTERISTICA en la base de datos y la uso para actualizarle los datos nuevos
        Characteristic existingCharacteristic = characteristicService.getCharacteristicById(characteristic.getId());
        //Si no existe, lanzo excepcion
        if (existingCharacteristic == null) {
            throw new CategoryNotFoundException("La caracteristica " + characteristic.getName() + " no se encuentra registrada en la base de datos");
        }
        //Si existe, actualizo los datos
        logger.info("Inicio actualizacion caracteristica");
        existingCharacteristic.setName(characteristic.getName());
        if (newFile != null && Arrays.stream(newFile).anyMatch(file -> file.getSize() > 0)) {
            try {
                List<String> images = s3Service.uploadFiles(newFile, "characteristics");
                if(existingCharacteristic.getIconUrl() != null) {
                    s3Service.deleteFiles(List.of(existingCharacteristic.getIconUrl()), "characteristics");
                }
                existingCharacteristic.setIconUrl(images.get(0));
            } catch (Exception e) {
                logger.error("Error al actualizar caracteristica", e);
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.ok(characteristicService.updateCharacteristic(existingCharacteristic));
    }

    @DeleteMapping("/auth/characteristics/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Transactional
    public ResponseEntity<?> deleteCharacteristic(@PathVariable("id") Long id) {
        logger.info("Inicio eliminacion caracteristica");
        try {
            characteristicService.deleteCharacteristic(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Characteristic deleted successfully");
            return ResponseEntity.ok().body(response);
        } catch (IllegalStateException e) {
            logger.error("Error when deleting feature", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            // Devolver una respuesta con el Map convertido a JSON automáticamente por Spring
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
    }
}
