package com.carssps.service;

import java.util.List;

import com.carssps.model.OrderProduct;

public interface OrderProductService {
	List<OrderProduct> saveAll(List<OrderProduct> orderProduct);
	OrderProduct save(OrderProduct orderProduct);
	int updateProductAmountByOrderId(int amount, int orderId, int productId);
	int deleteByOrderIdAndProductId(int orderId, int productId);
}
