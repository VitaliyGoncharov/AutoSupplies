package com.carssps.controller.manager;

import java.nio.file.attribute.UserPrincipal;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.model.Customer;
import com.carssps.model.Order;
import com.carssps.model.OrderDetails;
import com.carssps.model.Product;
import com.carssps.model.request.OrderProductReq;
import com.carssps.model.request.OrderReq;
import com.carssps.service.CustomerService;
import com.carssps.service.OrderDetailsService;
import com.carssps.service.OrderService;
import com.carssps.service.ProductService;
import com.fasterxml.jackson.annotation.JsonView;

@RestController
@RequestMapping("/api/manager")
public class OrderManagerController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private OrderDetailsService orderProductService;
	
	@Autowired
	private EntityManager entityManager;
	
	@RequestMapping(value = "/order/{orderId}/products/edit", method = RequestMethod.POST)
	public ResponseEntity<Boolean> updateOrderProducts(
			@PathVariable("orderId") Integer orderId,
			@RequestBody List<OrderProductReq> productsReq) {
		
		Order order = orderService.findById(orderId);
		
		List<OrderDetails> productsDB = order.getOrderProducts();
		for (OrderDetails productDB : productsDB) {
			OrderProductReq productReq = productsReq.stream()
				.filter(product -> product.getId() == productDB.getProduct().getId())
				.findFirst().orElse(null);
			
			if (productReq == null) {
				this.deleteProduct(productDB, orderId);
			}
			
			if (productReq != null && productReq.getAmount() != productDB.getAmount()) {
				this.updateProductAmount(productReq, orderId);
			}
			
			if (productReq != null) {
				productsReq.remove(productReq);
			}
		}
		
		if (!productsReq.isEmpty()) {
			for (OrderProductReq productReq: productsReq) {
				this.addProduct(productReq, orderId);
			}
		}
		
		this.updateTotal(orderId);
		return ResponseEntity.ok(true);
	}
	
	public Integer updateProductAmount(OrderProductReq productReq, int orderId) {
		int orderProductId = orderProductService.updateProductAmountByOrderId(
				productReq.getAmount(),
				orderId,
				productReq.getId()
		);
		
		return orderProductId;
	}
	
	public ResponseEntity<Integer> addProduct(OrderProductReq productReq, int orderId) {
		Product product = productService.findById(productReq.getId());
		Order order = orderService.findById(orderId);
		OrderDetails orderProduct = new OrderDetails(order, product, productReq.getAmount());
		OrderDetails newRcd = orderProductService.save(orderProduct);
		return ResponseEntity.ok(newRcd.getId());
	}
	
	public void deleteProduct(OrderDetails productDB, int orderId) {
		orderProductService.deleteByOrderIdAndProductId(
				orderId,
				productDB.getProduct().getId()
		);
	}
	
	@RequestMapping("/orders")
	public ResponseEntity<List<Order>> getOrders() {
		return ResponseEntity.ok(orderService.findAll());
	}
	
	@RequestMapping("/orders-fat")
	public ResponseEntity<List<Order>> getOrdersFat() {
		return ResponseEntity.ok(orderService.findAll());
	}
	
	@RequestMapping("/order")
	public ResponseEntity<Order> getOrder(@RequestParam("id") Integer orderId, Principal principal) {
		return ResponseEntity.ok(orderService.findById(orderId));
	}
	
	private int updateTotal(int orderId) {
		int total = 0;
		entityManager.clear();
		Order order = orderService.findById(orderId);
		List<OrderDetails> products = order.getOrderProducts();
		for (OrderDetails orderProduct : products) {
			total += orderProduct.getAmount() * orderProduct.getProduct().getPrice();
		}
		return orderService.updateTotal(total, orderId);
	}
}
