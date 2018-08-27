package com.carssps.controller.manager;

import java.util.LinkedList;
import java.util.List;
import java.util.PriorityQueue;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.controller.View;
import com.carssps.model.Order;
import com.carssps.model.OrderProduct;
import com.carssps.model.Product;
import com.carssps.model.request.UpdateOrderProductRequest;
import com.carssps.service.OrderProductService;
import com.carssps.service.OrderService;
import com.carssps.service.ProductService;
import com.fasterxml.jackson.annotation.JsonView;

@RestController
@RequestMapping("/api/manager")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private OrderProductService orderProductService;
	
	@RequestMapping(value = "/order/product/amount/edit", method = RequestMethod.POST)
	public ResponseEntity<Integer> updateProductAmount(@RequestBody UpdateOrderProductRequest orderProductReq) {
		int success = orderProductService.updateProductAmountByOrderId(
				orderProductReq.getAmount(),
				orderProductReq.getOrderId(),
				orderProductReq.getProductId()
		);
		return ResponseEntity.ok(success);
	}
	
	@RequestMapping(value = "/order/product/add", method = RequestMethod.POST)
	public ResponseEntity<OrderProduct> addProduct(@RequestBody UpdateOrderProductRequest orderProductReq) {
		Product product = productService.findById(orderProductReq.getProductId());
		Order order = orderService.findById(orderProductReq.getOrderId());
		OrderProduct orderProduct = new OrderProduct(order, product, orderProductReq.getAmount());
		return ResponseEntity.ok(orderProductService.save(orderProduct));
	}
	
	@RequestMapping(value = "/order/product/delete", method = RequestMethod.POST)
	public ResponseEntity<Integer> deleteProduct(@RequestBody UpdateOrderProductRequest orderProductReq) {
		int success = orderProductService.deleteByOrderIdAndProductId(
				orderProductReq.getOrderId(),
				orderProductReq.getProductId()
		);
		return ResponseEntity.ok(success);
	}
	
	@JsonView(View.Public.class)
	@RequestMapping("/orders")
	public ResponseEntity<List<Order>> getOrders() {
		return ResponseEntity.ok(orderService.findAll());
	}
	
	@RequestMapping("/orders-fat")
	public ResponseEntity<List<Order>> getOrdersFat() {
		return ResponseEntity.ok(orderService.findAll());
	}
	
	@RequestMapping("/order")
	public ResponseEntity<Order> getOrder(@RequestParam("id") Integer orderId) {
		return ResponseEntity.ok(orderService.findById(orderId));
	}
	
	@RequestMapping(value = "/order/edit", method = RequestMethod.POST)
	public ResponseEntity<Integer> editOrder(
			@RequestParam("id") int id,
			@RequestParam(value = "address", required = false) String address,
			@RequestParam(value = "status", required = false) Short status) {
		int updatedId = 0;
		
		System.out.println("ADRESS:: " + address);
		System.out.println("STATUS:: " + status);
		
		if (address != null && status != null) {
			updatedId = orderService.updateAddressAndStatus(address, status, id);
		}
		
		if (address != null && status == null) {
			updatedId = orderService.updateAddress(address, id);
		}
		
		if (address == null && status != null) {
			updatedId = orderService.updateStatus(status, id);
		}
		
		return ResponseEntity.ok(updatedId);
	}
}
