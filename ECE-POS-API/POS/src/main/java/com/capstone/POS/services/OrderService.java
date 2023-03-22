package com.capstone.POS.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.POS.exceptions.ResourceNotFoundException;
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

    public Order save(Order newOrder) {
        return orderRepository.save(newOrder);
    }

    public Order updateOrder(Long id, Order orderDetails) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));

        order.setDateCreated(orderDetails.getDateCreated());
        order.setAccountNumber(orderDetails.getAccountNumber());
        order.setGrantEndDate(orderDetails.getGrantEndDate());
        order.setRequestPerson(orderDetails.getRequestPerson());
        order.setPhone(orderDetails.getPhone());
        order.setEmail(orderDetails.getEmail());
        order.setRoom(orderDetails.getRoom());
        order.setFacultyEmails(orderDetails.getFacultyEmails());
        order.setIsStandingContract(orderDetails.getIsStandingContract());
        order.setIsAuthorized(orderDetails.getIsAuthorized());
        order.setIsOrdered(orderDetails.getIsOrdered());
        order.setIsCompleted(orderDetails.getIsCompleted());
        order.setTracking(orderDetails.getTracking());
        order.setShippingTotal(orderDetails.getShippingTotal());
        order.setTotalCost(orderDetails.getTotalCost());
        order.setName(orderDetails.getName());
        order.setAddress(orderDetails.getAddress());
        order.setUrl(orderDetails.getUrl());
        order.setPhoneNumber(orderDetails.getPhoneNumber());
        order.setFaxNumber(orderDetails.getFaxNumber());
        order.setContactPerson(orderDetails.getContactPerson());
        order.setDateAuthorized(orderDetails.getDateAuthorized());
        order.setDateOrdered(orderDetails.getDateOrdered());
        order.setDateCompleted(orderDetails.getDateCompleted());

        return orderRepository.save(order);
    }
}