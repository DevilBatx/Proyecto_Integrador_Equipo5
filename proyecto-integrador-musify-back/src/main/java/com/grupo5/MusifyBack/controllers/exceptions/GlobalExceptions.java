package com.grupo5.MusifyBack.controllers.exceptions;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptions {
    static Logger logger = LogManager.getLogger(GlobalExceptions.class);

    @ExceptionHandler({ProductAlreadyExistsException.class})
    public ResponseEntity<String> productAlreadyExists(ProductAlreadyExistsException ex) {
        logger.error("Ha ocurrido un error: " + ex.getMessage());
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}
