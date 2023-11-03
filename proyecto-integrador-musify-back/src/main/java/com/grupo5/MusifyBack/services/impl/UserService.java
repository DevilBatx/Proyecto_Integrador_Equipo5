package com.grupo5.MusifyBack.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo5.MusifyBack.dto.UserDTO;
import com.grupo5.MusifyBack.models.User;
import com.grupo5.MusifyBack.persistence.repositories.IUserRepository;
import com.grupo5.MusifyBack.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    ObjectMapper mapper;
    @Override
    public User saveUser(UserDTO userDTO) {
        User user = mapper.convertValue(userDTO, User.class);
        user.setIsAdmin(0);
        userRepository.save(user);

        return null;
    }
}
