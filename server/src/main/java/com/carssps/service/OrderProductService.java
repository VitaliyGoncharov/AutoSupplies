package com.carssps.service;


public interface OrderProductService {
	int updateProductAmountByOrderId(int amount, int orderId, int productId);
	int deleteByOrderIdAndProductId(int orderId, int productId);
}
