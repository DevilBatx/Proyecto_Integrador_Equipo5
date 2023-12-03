package com.grupo5.MusifyBack.services;

import com.grupo5.MusifyBack.models.Category;

import java.util.List;

public interface IEmailService {
    public void sendEmail( String to, String subject, String text);
}
