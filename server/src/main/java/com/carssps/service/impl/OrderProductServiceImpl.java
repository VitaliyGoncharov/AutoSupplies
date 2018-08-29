package com.carssps.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carssps.dao.OrderProductDao;
import com.carssps.model.OrderProduct;
import com.carssps.service.OrderProductService;

import java.util.List;

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
	
	@Override
	public List<OrderProduct> saveAll(List<OrderProduct> orderProduct) {
		return orderProductDao.saveAll(orderProduct);
	}
	
	@Override
	public OrderProduct save(OrderProduct orderProduct) {
		return orderProductDao.save(orderProduct);
	}
}
