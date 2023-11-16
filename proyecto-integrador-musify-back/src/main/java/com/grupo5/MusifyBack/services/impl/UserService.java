package com.grupo5.MusifyBack.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo5.MusifyBack.controllers.exceptions.UserAlreadyExistException;
import com.grupo5.MusifyBack.dto.UserDTO;
import com.grupo5.MusifyBack.models.User;
import com.grupo5.MusifyBack.persistence.repositories.IUserRepository;
import com.grupo5.MusifyBack.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService, UserDetailsService {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    ObjectMapper mapper;


    public ResponseEntity<?> saveUser(User userInfo) {
        if(userRepository.findByEmail(userInfo.getEmail()).isPresent()){
            throw new UserAlreadyExistException("User already exists", userInfo.getEmail());
        }
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        userInfo.setIsAdmin(0);
        userRepository.save(userInfo);

        emailService.sendEmail(userInfo.getEmail(), "Bienvenido a Musify",
                "<body style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; margin: 0; padding: 0;\">\n" +
                        "    <div style=\"max-width: 600px; margin: 50px auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\">\n" +
                        "        <h1 style=\"color: #333333;\">Gracias por registrarte en Musify!</h1>\n" +
                        "        <p style=\"color: #666666;\">Nos entusiasma tenerte a bordo, "+ userInfo.getName()+" "+ userInfo.getLastName()+" ("+userInfo.getEmail()+").</p>\n" +
                        "        <a href=\"http://c12-grupo5-front.s3-website-us-east-1.amazonaws.com/\" style=\"display: inline-block; padding: 10px 20px; background-color: #f58d42; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 20px;\">Acceder a Musify</a>\n" +
                        "    </div>\n" +
                        "</body>");


        return ResponseEntity.ok("User Added Successfully");
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found " + email));
        return mapper.convertValue(user, UserDTO.class);

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> userDetail = userRepository.findByEmail(username);

        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    //TODO Modificar Usuario (Administrador)
    //TODO Eliminar Usuario (Administrador)
    @Override
    public void deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.delete(user.get());
        } else {
            throw new UsernameNotFoundException("User not found " + id);
        }
    }
}
