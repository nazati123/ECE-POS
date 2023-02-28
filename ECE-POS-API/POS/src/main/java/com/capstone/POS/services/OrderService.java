package com.capstone.POS.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.POS.models.Order;
import com.capstone.POS.repositories.OrderRepository;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    public Order getById(Long id) {
        try {
            return orderRepository.findById(id).orElseThrow();
        } catch (Exception e) {
            return null;
        }
    }
}