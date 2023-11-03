package com.grupo5.MusifyBack.controllers.exceptions;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptions {
    static Logger logger = LogManager.getLogger(GlobalExceptions.class);

    @ExceptionHandler({ProductAlreadyExistsException.class})
    public ResponseEntity<String> productAlreadyExists(ProductAlreadyExistsException ex) {
        logger.error("Ha ocurrido un error: " + ex.getMessage());
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler({ProductNotExists.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> productNotExists(ProductNotExists ex) {
        logger.error("Ha ocurrido un error: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}

