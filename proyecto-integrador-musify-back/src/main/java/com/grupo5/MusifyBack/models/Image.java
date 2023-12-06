package com.grupo5.MusifyBack.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table (name = "producto_imagen",uniqueConstraints = @UniqueConstraint(columnNames = "urlimgproducto"))
public class Image {
    @Id
    @Column(name = "urlimgproducto")
    private String imageUrl;
    @Column(name = "ordenimgproducto")
    private Integer imageOrder;
    @ManyToOne
    @JoinColumn(name = "idproducto", nullable = false)
    @JsonBackReference
    private Product product;


}
