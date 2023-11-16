package com.grupo5.MusifyBack.controllers.exceptions;

import com.grupo5.MusifyBack.dto.response.UserExistsResponse;

public class UserAlreadyExistException extends RuntimeException{
    private final UserExistsResponse userExistsResponse;
    public UserAlreadyExistException(String message, String userEmail) {
        super(message);
        this.userExistsResponse = new UserExistsResponse(message, userEmail);
    }
    public UserExistsResponse getResponse(){
        return userExistsResponse;
    }
}
