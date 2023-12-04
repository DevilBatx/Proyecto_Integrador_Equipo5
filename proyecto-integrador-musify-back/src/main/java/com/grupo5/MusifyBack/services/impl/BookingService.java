package com.grupo5.MusifyBack.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grupo5.MusifyBack.dto.BookingDTO;
import com.grupo5.MusifyBack.dto.ProductDTO;
import com.grupo5.MusifyBack.models.Booking;
import com.grupo5.MusifyBack.models.Product;
import com.grupo5.MusifyBack.persistence.repositories.IBookingRepository;
import com.grupo5.MusifyBack.persistence.repositories.IProductRepository;
import com.grupo5.MusifyBack.persistence.repositories.IUserRepository;
import com.grupo5.MusifyBack.services.IBookingService;
import com.grupo5.MusifyBack.services.IProductService;
import com.grupo5.MusifyBack.services.IUserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class BookingService  implements IBookingService {

    @Autowired
    IBookingRepository bookingRepository;

    @Autowired
    IProductRepository productRepository;
    @Autowired
    IUserRepository userRepository;
    @Autowired
    ObjectMapper mapper;
    @Autowired
    ImageService imageService;

    @Override
    public List<LocalDate> getBookedDates(Long idProduct) {
        List<Booking> bookings = bookingRepository.findByProductId(idProduct);
        List<LocalDate> bookedDates = new ArrayList<>();
        for (Booking booking : bookings) {
            LocalDate startDate = booking.getStartDate();
            LocalDate endDate = booking.getEndDate();

            while (startDate.isBefore(endDate.plusDays(1))) {
                bookedDates.add(startDate);
                startDate = startDate.plusDays(1);
            }

        }
        bookedDates.sort(LocalDate::compareTo);
        return bookedDates;
    }

    @Override
    public List<LocalDate> getFreeDates(List<LocalDate> bookedDates) {
        List<LocalDate> allDates = new ArrayList<>();
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = LocalDate.now().plusMonths(4);
        while (startDate.isBefore(endDate.plusDays(1))) {
            allDates.add(startDate);
            startDate = startDate.plusDays(1);
        }
        allDates.removeAll(bookedDates);

        return new ArrayList<>(allDates);

    }

    @Override
    public List<LocalDate> getAvailableDates(Long idProduct) {
        List<LocalDate> bookedDates = getBookedDates(idProduct);
        List<LocalDate> freeDates = getFreeDates(bookedDates);
        List<LocalDate> availableDates = new ArrayList<>(freeDates);
        availableDates.sort(LocalDate::compareTo);
        return new ArrayList<>(availableDates);
    }

    @Override
    public Booking save(Booking booking) {

// Validar disponibilidad antes de crear la reserva
        if(isAvailable(booking)) {
            return bookingRepository.save(booking);
        }else{
            throw new IllegalStateException("No es posible crear la reserva porque el producto no está disponible en las fechas seleccionadas.");
        }


    }

    @Override
    @Transactional
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    @Transactional
    public List<BookingDTO> getBookingsByUserId(Long idUser) {
        List<Booking> bookings = bookingRepository.findBookingsByUserId(idUser);
        List<BookingDTO> bookingDTOS = new ArrayList<>();
        for (Booking booking : bookings) {
            BookingDTO bookingDTO = mapper.convertValue(booking, BookingDTO.class);
            Product product = booking.getProduct();
            ProductDTO productDTO = mapper.convertValue(product, ProductDTO.class);
            productDTO.setImages(product.getImages());
            bookingDTO.setProduct(productDTO);

            bookingDTOS.add(bookingDTO);

        }
        return bookingDTOS;


    }

    private boolean isAvailable(Booking booking) {
        List<Booking> bookings = bookingRepository.findByProductAndOverlappingDate(booking.getProduct().getId(), booking.getStartDate(), booking.getEndDate());
        for (Booking booking1 : bookings) {
            if (booking.getStartDate().isBefore(booking1.getEndDate()) && booking.getEndDate().isAfter(booking1.getStartDate())) {
                return false;
            }
        }
        return true;
    }
}
