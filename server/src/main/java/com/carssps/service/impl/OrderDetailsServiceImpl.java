package com.carssps.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carssps.dao.OrderDetailsDao;
import com.carssps.model.OrderDetails;
import com.carssps.service.OrderDetailsService;

import java.util.List;

import javax.transaction.Transactional;

@Service
@Transactional
public class OrderDetailsServiceImpl implements OrderDetailsService {
	
	@Autowired
	private OrderDetailsDao orderProductDao;

	@Override
	public int updateProductAmountByOrderId(int amount, int orderId, int productId) {
		return orderProductDao.updateAmountById(amount, orderId, productId);
	}

	@Override
	public int deleteByOrderIdAndProductId(int orderId, int productId) {
		return orderProductDao.deleteByOrderIdAndProductId(orderId, productId);
	}
	
	@Override
	public List<OrderDetails> saveAll(List<OrderDetails> orderProduct) {
		return orderProductDao.saveAll(orderProduct);
	}
	
	@Override
	public OrderDetails save(OrderDetails orderProduct) {
		return orderProductDao.save(orderProduct);
	}
}
