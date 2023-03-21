package com.capstone.POS.controllers;

import com.capstone.POS.exceptions.OrderNotFoundException;
import com.capstone.POS.models.Order;
import com.capstone.POS.repositories.OrderRepository;
import com.capstone.POS.services.OrderService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

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
        /*  FIXME: TRIGGER A CALL TO EMAIL SERVICE
        String node_path = "../../../../../../../../email_test/apiTest.js";
        ProcessBuilder pb = new ProcessBuilder("node", node_path);
        Process p = pb.start();

        OutputStream os = p.getOutputStream();
        InputStream is = p.getInputStream();

        PrintWriter w = new PrintWriter(new OutputStreamWriter(os));
        BufferedReader r = new BufferedReader(new InputStreamReader(is));

        w.println(order.getId().toString());
        w.flush();

        String output = r.readLine();
        if (!(output.equals("Success"))) {
            // some error handling
        }
        */
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }
}
