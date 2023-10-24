package com.grupo5.proyecto.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Columns;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table (name = "producto_imagen")
public class Images {
    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    //private Long id;
    @Id
    @Column(name = "urlimgproducto")
    private String imageUrl;
    @Column(name = "ordenimgproducto")
    private Integer imageOrder;
    @ManyToOne
    @JoinColumn(name = "idproducto", nullable = false)
    private Product product;


}
