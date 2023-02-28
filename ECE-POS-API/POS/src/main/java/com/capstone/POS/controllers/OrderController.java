package com.capstone.POS.controllers;

import com.capstone.POS.exceptions.OrderNotFoundException;
import com.capstone.POS.models.Item;
import com.capstone.POS.models.Order;
import com.capstone.POS.repositories.ItemRepository;
import com.capstone.POS.repositories.OrderRepository;
import com.capstone.POS.services.OrderService;

import java.io.Console;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        Order order = orderService.getById(id);
        if (order == null)
        throw new OrderNotFoundException(id);
        return order;
    }
    
}
