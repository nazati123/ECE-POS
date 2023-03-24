package com.capstone.POS.controllers;

import com.capstone.POS.exceptions.OrderNotFoundException;
import com.capstone.POS.models.Order;
import com.capstone.POS.repositories.OrderRepository;
import com.capstone.POS.services.OrderService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

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

    @PostMapping
    public Order create(@RequestBody Order order) {
        Order newOrder = orderService.save(order);

        //  FIXME: TRIGGER A CALL TO EMAIL SERVICE
        String nodeUrl = "http://localhost:3000";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String jsonPayload = "{\"id\": \"" + order.getId().toString() + "\"}";
        HttpEntity<String> request = new HttpEntity<>(jsonPayload, headers);

        // send the request to the Node.js server
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.exchange(nodeUrl + "/order-awaiting", HttpMethod.POST, request, String.class);

        return newOrder;
    }
}
