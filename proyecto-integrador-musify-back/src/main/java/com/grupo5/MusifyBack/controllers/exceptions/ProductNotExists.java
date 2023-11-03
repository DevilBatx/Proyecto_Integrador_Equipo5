package com.grupo5.MusifyBack.controllers.exceptions;

public class ProductNotExists extends RuntimeException {
    public ProductNotExists(String message) {
        super(message);
    }
}
