package com.grupo5.MusifyBack.services;

import com.grupo5.MusifyBack.dto.UserDTO;
import com.grupo5.MusifyBack.models.User;

public interface IUserService {
    public User saveUser(UserDTO userDTO);
}
