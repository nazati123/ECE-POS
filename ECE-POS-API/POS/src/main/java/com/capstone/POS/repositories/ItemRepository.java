package com.capstone.POS.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.POS.models.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    
    public List<Item> findByOrderId(Long orderId);
}
