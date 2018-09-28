package com.carssps.service;

import java.util.List;

import com.carssps.model.OrderDetails;

public interface OrderDetailsService {
	List<OrderDetails> saveAll(List<OrderDetails> orderProduct);
	OrderDetails save(OrderDetails orderProduct);
	int updateProductAmountByOrderId(int amount, int orderId, int productId);
	int deleteByOrderIdAndProductId(int orderId, int productId);
}
