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
    private PasswordEncoder encoder;
    @Autowired
    ObjectMapper mapper;


    public ResponseEntity<?> saveUser(User userInfo) {
        if(userRepository.findByEmail(userInfo.getEmail()).isPresent()){
            throw new UserAlreadyExistException("User already exists");
        }
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        userInfo.setIsAdmin(0);
        userRepository.save(userInfo);
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
