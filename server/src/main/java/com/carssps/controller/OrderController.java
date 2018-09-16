package com.carssps.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.model.Customer;
import com.carssps.model.Order;
import com.carssps.model.OrderProduct;
import com.carssps.model.Product;
import com.carssps.model.request.OrderProductReq;
import com.carssps.model.request.OrderReq;
import com.carssps.service.CustomerService;
import com.carssps.service.OrderProductService;
import com.carssps.service.OrderService;
import com.carssps.service.ProductService;

@RestController
@RequestMapping("/api")
public class OrderController {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private OrderProductService orderProductService;
	
	@Autowired
	private OrderService orderService;
	
	@RequestMapping(value = "/order/add", method = RequestMethod.POST)
	public ResponseEntity<Integer> addOrder(@RequestBody OrderReq orderReq) {
		
		List<Integer> ids = new ArrayList<>();
		for (OrderProductReq orderProduct : orderReq.getProducts()) {
			ids.add(orderProduct.getId());
		}
		
		List<Product> products = productService.findAllById(ids);
		List<OrderProduct> orderProducts = new ArrayList<>();
		
		int total = 0;
		for (int i = 0; i < products.size(); i++) {
			total += products.get(i).getPrice() * orderReq.getProducts().get(i).getAmount();
		}
		
		Customer customer = customerService.add(new Customer(
				orderReq.getName(),
				orderReq.getPhone()
		));
		
		Order order = orderService.add(new Order(
				customer,
				orderReq.getAddress(),
				(short) 1,
				total
		));
		
		
		for (int i = 0; i < products.size(); i++) {
			orderProducts.add(new OrderProduct(
					order,
					products.get(i),
					orderReq.getProducts().get(i).getAmount()
			));
		}
		orderProductService.saveAll(orderProducts);
		return ResponseEntity.ok(order.getId());
	}
}
