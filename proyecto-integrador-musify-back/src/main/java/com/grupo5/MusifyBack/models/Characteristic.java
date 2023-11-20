package com.grupo5.MusifyBack.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "caracteristica")
public class Characteristic {
    @Column(name = "idcaracteristica")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nombrecaracteristica")
    private String name;
    @Column(name = "urliconocaracteristica")
    private String iconUrl;
    @ManyToMany(mappedBy = "characteristics")
    private Set<Product> products;
    //TODO Cambiar en base de datos a relacion muchos a muchos
}
