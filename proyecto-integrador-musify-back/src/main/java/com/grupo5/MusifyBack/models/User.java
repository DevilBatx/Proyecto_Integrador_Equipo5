package com.grupo5.MusifyBack.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuario",uniqueConstraints = @UniqueConstraint(columnNames = "emailUsuario"))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUsuario")
    private Long id;
    @Column(name = "emailUsuario")
    private String email;
    @Column(name = "nombreUsuario")
    private String name;
    @Column(name = "apellidoUsuario")
    private String lastName;
    @Column(name = "passwordUsuario")
    private String password;
    @Column(name = "esAdminUsuario")
    private Integer isAdmin;

}
