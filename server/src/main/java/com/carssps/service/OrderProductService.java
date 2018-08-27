package com.carssps.service;

import com.carssps.model.OrderProduct;

public interface OrderProductService {
	OrderProduct save(OrderProduct orderProduct);
	int updateProductAmountByOrderId(int amount, int orderId, int productId);
	int deleteByOrderIdAndProductId(int orderId, int productId);
}
