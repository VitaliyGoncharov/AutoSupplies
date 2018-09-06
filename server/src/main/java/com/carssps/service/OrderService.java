package com.carssps.service;

import java.util.List;

import com.carssps.model.Order;

public interface OrderService {
	List<Order> findAll();
	Order findById(int id);
	Order add(Order order);
	Order save(Order order);
	int updateAddressAndStatus(String address, short status, int id);
	int updateAddress(String address, int id);
	int updateStatus(short status, int id);
	int updateTotal(int total, int id);
}
