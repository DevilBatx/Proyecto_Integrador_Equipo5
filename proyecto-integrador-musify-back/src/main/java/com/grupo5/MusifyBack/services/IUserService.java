package com.grupo5.MusifyBack.services;

import com.grupo5.MusifyBack.dto.UserDTO;
import com.grupo5.MusifyBack.models.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserService {

    ResponseEntity<?> saveUser(User userinfo);
    List<User> getAllUsers();

    UserDTO getUserByEmail(String email);

    void deleteUser(Long id);
    void updateAdminRole(String isAdmin, Long id);
    ResponseEntity<?>  updateUser(UserDTO userDTO, Long id);

    String updateUserPassword(String email, String currentPassword, String newPassword);

}
