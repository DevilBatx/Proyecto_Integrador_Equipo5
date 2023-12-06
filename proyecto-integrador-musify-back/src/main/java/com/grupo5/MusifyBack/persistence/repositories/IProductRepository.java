package com.grupo5.MusifyBack.persistence.repositories;

import com.grupo5.MusifyBack.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

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

    @Query(value = """
            select * from producto
            where producto.nombreProducto like concat('%',?1, '%') and  (           
            select count(*) from reserva where reserva.idproducto=producto.idProducto
            and (
            (fechaInicioReserva >= ?2 and ?3>=fechaInicioreserva) or
            (?2>= fechaInicioreserva and ?3 <= fechafinreserva) or
            (?3 >= fechafinreserva and fechafinreserva >= ?2) or
            (fechaInicioreserva >= ?2 and ?3 >= fechafinreserva)
            ) limit 1                      
            ) < 1""", nativeQuery = true)
    List<Product> findProductByDateRange(String word, LocalDate startDate, LocalDate endDate);
}
