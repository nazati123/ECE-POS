package com.capstone.POS.controllers;

import com.capstone.POS.exceptions.OrderNotFoundException;
import com.capstone.POS.models.Order;
import com.capstone.POS.repositories.OrderRepository;
import com.capstone.POS.services.OrderService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
        return newOrder;
    }
}
