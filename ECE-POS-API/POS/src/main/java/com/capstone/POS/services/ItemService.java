package com.capstone.POS.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.POS.exceptions.ResourceNotFoundException;
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

    public Item updateItem(Long id, Item itemDetails) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Item not found with id " + id));

        item.setQuantity(itemDetails.getQuantity());
        item.setPartNumber(itemDetails.getPartNumber());
        item.setDescription(itemDetails.getDescription());
        item.setPrice(itemDetails.getPrice());
        item.setTotal(itemDetails.getTotal()); 
        item.setOrderId(itemDetails.getOrderId());     

        return itemRepository.save(item);
    }

    public void deleteItem(Long id) {
        Item item  = itemRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Item not found with id " + id));
        
        itemRepository.delete(item);
    }
}