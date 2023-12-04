package com.grupo5.MusifyBack.persistence.repositories;

import com.grupo5.MusifyBack.dto.BookingDTO;
import com.grupo5.MusifyBack.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IBookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByProductId(Long idProduct);


    @Query("SELECT b FROM Booking b WHERE b.product.id = :productId AND b.startDate <= :endDate AND b.endDate >= :startDate")
    List<Booking> findByProductAndOverlappingDate(@Param("productId") Long productoId,
                                                  @Param("startDate") LocalDate fechaInicio,
                                                  @Param("endDate") LocalDate fechaFin);

    List<Booking> findBookingsByUserId(Long idUser);


}
