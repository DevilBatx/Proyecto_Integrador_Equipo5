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
@EqualsAndHashCode(exclude = {"bookings"})
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
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "producto_caracteristica",
            joinColumns = @JoinColumn(name = "idproducto", referencedColumnName = "idproducto"),
            inverseJoinColumns = @JoinColumn(name = "idcaracteristica", referencedColumnName = "idcaracteristica"))
    private Set<Characteristic> characteristics;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Booking> bookings;


}
