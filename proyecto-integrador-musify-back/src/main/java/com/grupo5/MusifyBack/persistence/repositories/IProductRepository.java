package com.grupo5.MusifyBack.persistence.repositories;

import com.grupo5.MusifyBack.dto.ProductDTO;
import com.grupo5.MusifyBack.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {

    // Obtener X cantidad de  productos aleatorios de la base de datos
    @Query(value = "SELECT * FROM producto ORDER BY RAND()", nativeQuery = true)
    List<Product> findRandomProducts();
    @Query(value = "SELECT * FROM producto WHERE idcategoria = ?1", nativeQuery = true)
    List<Product> findProductsByCategories_Id(Long idCategory);
    @Query(value = "SELECT * FROM producto WHERE nombreproducto LIKE %?1% LIMIT 6", nativeQuery = true)
    List<Product> findProductsBySearchString(String search);
    boolean existsByName(String name);

    @Query("SELECT p FROM Product p " +
            "LEFT JOIN FETCH p.category " +
            "LEFT JOIN FETCH p.images " +
            "LEFT JOIN FETCH p.characteristics " +
            "WHERE p.id = :productId")
    Optional<Product> findByIdWithDetails(@Param("productId") Long productId);




}
