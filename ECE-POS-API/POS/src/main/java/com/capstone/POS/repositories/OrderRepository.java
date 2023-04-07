package com.capstone.POS.repositories;

import com.capstone.POS.models.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    //List<Order> findByGroupId(String groupId);
}