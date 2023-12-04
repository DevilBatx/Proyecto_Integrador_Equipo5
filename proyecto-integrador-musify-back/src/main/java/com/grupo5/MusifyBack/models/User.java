package com.grupo5.MusifyBack.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.Email;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuario",uniqueConstraints = @UniqueConstraint(columnNames = "emailusuario"))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idusuario")
    private Integer id;
    @Column(name = "emailusuario")
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email is not valid")
    private String email;
    @Column(name = "nombreusuario")
    @NotBlank(message = "Name is mandatory")
    private String name;
    @Column(name = "apellidousuario")
    @NotBlank(message = "Last Name is mandatory")
    private String lastName;
    @Column(name = "passwordusuario")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;
    @Column(name = "esadminusuario")
    private Integer isAdmin;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Booking> bookings;


}
