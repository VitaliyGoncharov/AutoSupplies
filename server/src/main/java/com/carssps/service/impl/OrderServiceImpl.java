package com.carssps.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carssps.dao.OrderDao;
import com.carssps.model.Order;
import com.carssps.service.OrderService;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	private OrderDao orderDao;

	@Override
	public List<Order> findAll() {
		List<Order> orders = new ArrayList<>();
		orderDao.findAll().forEach(orders::add);
		return orders;
	}

	@Override
	public Order findById(int id) {
		return orderDao.findById(id).get();
	}

	@Override
	public int updateAddressAndStatus(String address, short status, int id) {
		return orderDao.updateAddressAndStatus(address, status, id);
	}
	
	@Override
	public int updateAddress(String address, int id) {
		return orderDao.updateAddress(address, id);
	}
	
	@Override
	public int updateStatus(short status, int id) {
		return orderDao.updateStatus(status, id);
	}
}
