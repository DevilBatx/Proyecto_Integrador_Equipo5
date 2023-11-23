package com.grupo5.MusifyBack.persistence.repositories;

import com.grupo5.MusifyBack.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {

    // Obtener X cantidad de  productos aleatorios de la base de datos
    @Query(value = "SELECT * FROM producto ORDER BY RAND()", nativeQuery = true)
    List<Product> findRandomProducts();
    @Query(value = "SELECT * FROM producto WHERE id_categoria = ?1", nativeQuery = true)
    List<Product> findProductsByCategories_Id(Long idCategory);
    @Query(value = "SELECT * FROM producto WHERE nombreproducto LIKE %?1% LIMIT 6", nativeQuery = true)
    List<Product> findProductsBySearchString(String search);
    boolean existsByName(String name);

}
