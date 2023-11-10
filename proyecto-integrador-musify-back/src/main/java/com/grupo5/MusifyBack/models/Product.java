package com.grupo5.MusifyBack.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "producto")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idproducto")
    private Long id;
    @Column(name = "nombreproducto")
    private String name;
    @Column(name = "descproducto")
    private String description;
    //private String brand;
    @ManyToOne
    @JoinColumn(name = "idcategoria", nullable = false)
    private Category category;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Image> images;


}
