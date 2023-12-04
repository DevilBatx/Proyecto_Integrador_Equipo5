package com.grupo5.MusifyBack.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table (name = "producto_imagen",uniqueConstraints = @UniqueConstraint(columnNames = "urlimgproducto"))
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "imageUrl")
public class Image {
    @Id
    @Column(name = "urlimgproducto")
    private String imageUrl;
    @Column(name = "ordenimgproducto")
    private Integer imageOrder;
    @ManyToOne
    @JoinColumn(name = "idproducto", nullable = false)
    @JsonManagedReference
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private Product product;


}
