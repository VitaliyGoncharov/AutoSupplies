package com.carssps.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carssps.dao.OrderProductDao;
import com.carssps.service.OrderProductService;

import javax.transaction.Transactional;

@Service
@Transactional
public class OrderProductServiceImpl implements OrderProductService {
	
	@Autowired
	private OrderProductDao orderProductDao;

	@Override
	public int updateProductAmountByOrderId(int amount, int orderId, int productId) {
		return orderProductDao.updateAmountById(amount, orderId, productId);
	}

	@Override
	public int deleteByOrderIdAndProductId(int orderId, int productId) {
		return orderProductDao.deleteByOrderIdAndProductId(orderId, productId);
	}
}
