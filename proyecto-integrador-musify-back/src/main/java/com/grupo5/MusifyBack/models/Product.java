    package com.grupo5.MusifyBack.models;
    import com.fasterxml.jackson.annotation.*;
    import jakarta.persistence.*;
    import lombok.*;

    import java.util.ArrayList;
    import java.util.List;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name = "producto")
    @EqualsAndHashCode(exclude = {"bookings"})
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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
        @JsonManagedReference
        @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
        private Category category;
        @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
        @JsonBackReference
        @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "imageUrl")
        private List<Image> images;
        @ManyToMany(cascade ={CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
        @JoinTable(name = "producto_caracteristica",
                joinColumns = @JoinColumn(name = "idproducto", referencedColumnName = "idproducto"),
                inverseJoinColumns = @JoinColumn(name = "idcaracteristica", referencedColumnName = "idcaracteristica"))
        @JsonManagedReference
        @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
        private List<Characteristic> characteristics = new ArrayList<Characteristic>();

        @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
        @JsonIgnore
        private List<Booking> bookings;



    }
