package com.grupo5.MusifyBack.services.impl;

import com.grupo5.MusifyBack.dto.BookingDTO;
import com.grupo5.MusifyBack.models.Booking;
import com.grupo5.MusifyBack.persistence.repositories.IBookingRepository;
import com.grupo5.MusifyBack.persistence.repositories.IProductRepository;
import com.grupo5.MusifyBack.persistence.repositories.IUserRepository;
import com.grupo5.MusifyBack.services.IBookingService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService  implements IBookingService {

    @Autowired
    IBookingRepository bookingRepository;

    @Autowired
    IProductRepository productRepository;
    @Autowired
    IUserRepository userRepository;

    @Autowired
    EmailService emailService;

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
    public Booking save(BookingDTO bookingDto) {

// Validar disponibilidad antes de crear la reserva
        if(isAvailable(bookingDto)) {
            Booking booking = new Booking();
            booking.setStartDate(bookingDto.getStartDate());
            booking.setEndDate(bookingDto.getEndDate());
            booking.setProduct(productRepository.findById(bookingDto.getProductId()).get());
            booking.setUser(userRepository.findById(bookingDto.getUserId()).get());

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            Booking savedBooking = bookingRepository.save(booking);
            emailService.sendEmail(booking.getUser().getEmail(), "Reserva creada",
                    "<body style=\"font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; margin: 0; padding: 0;\">\n" +
                            "    <div style=\"max-width: 600px; margin: 50px auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\">\n" +
                            "        <h1 style=\"color: #333333;\">Reserva creada!</h1>\n" +
                            "        <p style=\"color: #666666;\">Tu reserva ha sido creada exitosamente.</p>\n" +
                            "        <h3 style=\"color: #666666;\">Detalles de la reserva:</h3>\n" +
                            "        <p style=\"color: #666666;\">Producto: "+ booking.getProduct().getName()+"</p>\n" +
                            "        <p style=\"color: #666666;\">Fecha de inicio: "+ booking.getStartDate().format(formatter)+"</p>\n" +
                            "        <p style=\"color: #666666;\">Fecha de fin: "+ booking.getEndDate().format(formatter)+"</p>\n" +
                            "        <a href=\"http://c12-grupo5-front.s3-website-us-east-1.amazonaws.com/#/details/" + booking.getProduct().getId() + "\" style=\"display: inline-block; padding: 10px 20px; background-color: #f58d42; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 20px;\">Ver Producto</a>\n" +
                            "    </div>\n" +
                            "</body>");

            return savedBooking;
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
    public List<Booking> getBookingsByUserId(Long idUser) {
        List<Booking> bookings = bookingRepository.findBookingsByUserId(idUser);
        List<BookingDTO> bookingDTOS = new ArrayList<>();
        return bookings;


    }

    private boolean isAvailable(BookingDTO bookingDto) {
        List<Booking> bookings = bookingRepository.findByProductAndOverlappingDate(bookingDto.getProductId(), bookingDto.getStartDate(), bookingDto.getEndDate());
        for (Booking booking1 : bookings) {
            if (bookingDto.getStartDate().isBefore(booking1.getEndDate()) && bookingDto.getEndDate().isAfter(booking1.getStartDate())) {
                return false;
            }
        }
        return true;
    }
}
