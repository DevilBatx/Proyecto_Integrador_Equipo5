package com.grupo5.MusifyBack.services;

import com.grupo5.MusifyBack.models.Booking;

import java.time.LocalDate;
import java.util.List;

public interface IBookingService {
    List<LocalDate> getBookedDates(Long idProduct);
    List<LocalDate> getFreeDates(List<LocalDate> bookedDates);
    List<LocalDate> getAvailableDates(Long idProduct);
    Booking save(Booking booking);
    List<Booking> getAllBookings();
    List<Booking> getBookingsByUserId(Long idUser);

}
