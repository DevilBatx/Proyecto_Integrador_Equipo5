package com.grupo5.MusifyBack.controllers;

import com.grupo5.MusifyBack.dto.UserDTO;
import com.grupo5.MusifyBack.dto.request.AuthRequest;
import com.grupo5.MusifyBack.dto.response.AuthResponse;
import com.grupo5.MusifyBack.models.User;
import com.grupo5.MusifyBack.services.impl.JwtService;
import com.grupo5.MusifyBack.services.impl.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Validated
@RequestMapping("/api/v1/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/register")
    public ResponseEntity<?> addNewUser(@Valid @RequestBody User userInfo, BindingResult result) {
        if (result.hasErrors()) {
            // Manejo de errores de validación
            List<String> errores = result.getFieldErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errores);
        }
        return userService.saveUser(userInfo);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtService.generateToken(authRequest.getUsername());
            return ResponseEntity.ok(new AuthResponse(userService.getUserByEmail(authRequest.getUsername()).getIsAdmin(), token, true, "Authentication successful"));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse(null, null, false, "Authentication failed. Please check your credentials."));
        }
    }

    @Operation(summary = "Get User Data", security = @SecurityRequirement(name = "Token"), responses = {
            @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "404", description = "Not found", content = @Content),
            @ApiResponse(responseCode = "401", description = "Authentication Failure", content = @Content(schema = @Schema(hidden = true))
            )
    })

    @GetMapping("/user/userProfile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<UserDTO> userProfile() {

        UserDTO userDTO = userService.getUserByEmail(jwtService.getLoggedUserEmail());
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/admin/adminProfile")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<UserDTO> adminProfile() {

        UserDTO userDTO = userService.getUserByEmail(jwtService.getLoggedUserEmail());
        return ResponseEntity.ok(userDTO);
    }


    @GetMapping("/user/allUsers")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().body("User deleted successfully");
    }

    @PatchMapping("/user/role")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> updateAdminRole(@RequestBody List<UserDTO> userDTOList) {
           for (UserDTO userDTO : userDTOList){
               userService.updateAdminRole(userDTO.getIsAdmin(), userDTO.getId());
           }

        return ResponseEntity.ok().body("User role updated successfully");
    }
    @PatchMapping("/user/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @RequestBody UserDTO userDTO) {
        userService.updateUser(userDTO, id);
        return ResponseEntity.ok().body("User updated successfully");
    }

    @PatchMapping("/user/password")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> updateUserPassword(@RequestParam("email") String email, @RequestParam("currentPassword") String currentPassword, @RequestParam("newPassword") String newPassword) {
        userService.updateUserPassword(email, currentPassword, newPassword);
        return ResponseEntity.ok().body("Password updated successfully");
    }

}
