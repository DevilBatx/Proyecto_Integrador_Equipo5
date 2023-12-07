package com.grupo5.MusifyBack.controllers;

import com.grupo5.MusifyBack.dto.BookingDTO;
import com.grupo5.MusifyBack.models.Booking;
import com.grupo5.MusifyBack.services.impl.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class BookingController {
    @Autowired
    private BookingService bookingService;


    @PostMapping("/auth/bookings")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> saveBooking(@RequestBody BookingDTO bookingDto) {
        try {
            Booking newBooking = bookingService.save(bookingDto);
            return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
        } catch (Exception e) {
            String errorMessage = "Error al procesar la solicitud: " + e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.CONFLICT);
        }

    }

    @GetMapping("/public/bookings/{idProduct}/booked")
    public ResponseEntity<Map<String, List<LocalDate>>> getBookedDates(@PathVariable("idProduct") Long idProduct) {
        List<LocalDate> bookedDates = bookingService.getBookedDates(idProduct);
        Map<String, List<LocalDate>> response = new HashMap<>();
        response.put("dates", bookedDates);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/public/bookings/{idProduct}/available")
    public ResponseEntity<Map<String, List<LocalDate>>> getAvailableDates(@PathVariable("idProduct") Long idProduct) {
        List<LocalDate> availableDates = bookingService.getAvailableDates(idProduct);
        Map<String, List<LocalDate>> response = new HashMap<>();
        response.put("dates", availableDates);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/auth/bookings")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
    @GetMapping("/auth/bookings/{idUser}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable("idUser") Long idUser) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(idUser));
    }



}
