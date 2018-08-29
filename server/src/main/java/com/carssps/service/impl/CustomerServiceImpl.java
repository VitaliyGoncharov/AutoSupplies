package com.carssps.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carssps.dao.CustomerDao;
import com.carssps.model.Customer;
import com.carssps.service.CustomerService;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	private CustomerDao customerDao;

	@Override
	public Customer add(Customer customer) {
		return customerDao.save(customer);
	}
}
