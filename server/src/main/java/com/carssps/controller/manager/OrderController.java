package com.carssps.controller.manager;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.controller.View;
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
import com.fasterxml.jackson.annotation.JsonView;

@RestController
@RequestMapping("/api/manager")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private OrderProductService orderProductService;
	
	@RequestMapping(value = "/order/product/amount/edit", method = RequestMethod.POST)
	public ResponseEntity<Integer> updateProductAmount(@RequestBody OrderProductReq orderProductReq) {
		int success = orderProductService.updateProductAmountByOrderId(
				orderProductReq.getAmount(),
				orderProductReq.getOrderId(),
				orderProductReq.getProductId()
		);
		this.updateTotal(orderProductReq.getOrderId());
		return ResponseEntity.ok(success);
	}
	
	@RequestMapping(value = "/order/product/add", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addProduct(@RequestBody OrderProductReq orderProductReq) {
		Product product = productService.findById(orderProductReq.getProductId());
		Order order = orderService.findById(orderProductReq.getOrderId());
		OrderProduct orderProduct = new OrderProduct(order, product, orderProductReq.getAmount());
		orderProductService.save(orderProduct);
		this.updateTotal(orderProductReq.getOrderId());
		return ResponseEntity.ok(true);
	}
	
	@RequestMapping(value = "/order/product/delete", method = RequestMethod.POST)
	public ResponseEntity<Boolean> deleteProduct(@RequestBody OrderProductReq orderProductReq) {
		orderProductService.deleteByOrderIdAndProductId(
				orderProductReq.getOrderId(),
				orderProductReq.getProductId()
		);
		this.updateTotal(orderProductReq.getOrderId());
		return ResponseEntity.ok(true);
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
	
//	@RequestMapping(value = "/order/edit", method = RequestMethod.POST)
//	public ResponseEntity<Integer> editOrder(
//			@RequestParam("id") int id,
//			@RequestParam(value = "address", required = false) String address,
//			@RequestParam(value = "status", required = false) Short status) {
//		int updatedId = 0;
//		
//		System.out.println("ADRESS:: " + address);
//		System.out.println("STATUS:: " + status);
//		
//		if (address != null && status != null) {
//			updatedId = orderService.updateAddressAndStatus(address, status, id);
//		}
//		
//		if (address != null && status == null) {
//			updatedId = orderService.updateAddress(address, id);
//		}
//		
//		if (address == null && status != null) {
//			updatedId = orderService.updateStatus(status, id);
//		}
//		
//		return ResponseEntity.ok(updatedId);
//	}
	
	@RequestMapping(value = "/order/add", method = RequestMethod.POST)
	public ResponseEntity<Integer> addOrder(@RequestBody OrderReq orderReq) {
		
		List<Integer> ids = new ArrayList<>();
		for (OrderProductReq orderProduct : orderReq.getProducts()) {
			ids.add(orderProduct.getProductId());
		}
		
		List<Product> products = productService.findAllById(ids);
		List<OrderProduct> orderProducts = new ArrayList<>();
		
		int total = 0;
		for (int i = 0; i < products.size(); i++) {
			total += products.get(i).getPrice() * orderReq.getProducts()[i].getAmount();
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
					orderReq.getProducts()[i].getAmount()
			));
		}
		orderProductService.saveAll(orderProducts);
		return ResponseEntity.ok(order.getId());
	}
	
	private int updateTotal(int orderId) {
		int total = 0;
		Order order = orderService.findById(orderId);
		List<OrderProduct> products = order.getProducts();
		for (OrderProduct orderProduct : products) {
			total += orderProduct.getAmount() * orderProduct.getProduct().getPrice();
		}
		return orderService.updateTotal(total, orderId);
	}
}
