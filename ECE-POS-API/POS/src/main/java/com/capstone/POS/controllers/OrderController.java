package com.capstone.POS.controllers;

import com.capstone.POS.exceptions.ResourceNotFoundException;
import com.capstone.POS.models.Order;
import com.capstone.POS.repositories.OrderRepository;
import com.capstone.POS.services.OrderService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.service.annotation.PatchExchange;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    private String NODE_URL = "http://localhost:3000";

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
            return ResponseEntity.ok(order.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody Order order) {
        Order newOrder = orderService.save(order);

        // call node.js

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String jsonPayload = "{\"id\": \"" + order.getId().toString() + "\"}";
        HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

        // send the request to the Node.js server
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.exchange(NODE_URL + "/order-awaiting", HttpMethod.POST, request, String.class);

        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }

    
    @CrossOrigin(origins = "*")
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        try {
            String update = "none";
            Boolean email = false;
            Order oldOrder = orderService.getById(id);
            if (oldOrder.getIsAuthorized() != order.getIsAuthorized()) {
                update = "authorized";
                email = true;
            }
            if (oldOrder.getIsOrdered() != oldOrder.getIsOrdered()) {
                update = "ordered";
                email = true;
            }
            if (oldOrder.getIsCompleted() != order.getIsCompleted()) {
                update = "completed";
                email = true;
            }

            Order updatedOrder = orderService.updateOrder(id, order);

            if (email) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                String jsonPayload = "{\"id\": \"" + id.toString() + "\"\n" + "\"update\": \"" + update + "\"}";
                HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);
        
                // send the request to the Node.js server
                RestTemplate restTemplate = new RestTemplate();
                restTemplate.exchange(NODE_URL + "/order-update", HttpMethod.POST, request, String.class);
            }

            return ResponseEntity.ok(updatedOrder);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
