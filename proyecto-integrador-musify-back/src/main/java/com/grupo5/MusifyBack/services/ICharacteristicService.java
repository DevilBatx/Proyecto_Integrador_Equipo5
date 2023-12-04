package com.grupo5.MusifyBack.services;
import com.grupo5.MusifyBack.models.Characteristic;

import java.util.List;


public interface ICharacteristicService {

    List<Characteristic> getAllCharacteristics();
    Characteristic getCharacteristicById(Long id);
    Characteristic saveCharacteristic(Characteristic characteristic);
    Characteristic updateCharacteristic(Characteristic characteristic);
    void deleteCharacteristic(Long id);

    void addProductToCharacteristic(Long idCharacteristic, Long idProduct);
}
