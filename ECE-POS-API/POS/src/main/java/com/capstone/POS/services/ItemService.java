package com.capstone.POS.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.POS.models.Item;
import com.capstone.POS.repositories.ItemRepository;

@Service
public class ItemService {
    
    @Autowired
    ItemRepository itemRepository;

    public Item getById(Long id) {
        try {
            return itemRepository.findById(id).orElseThrow();
        } catch (Exception e) {
            return null;
        }
    }

    public Item save(Item newItem) {
        return itemRepository.save(newItem);
    }
}