package com.carssps.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carssps.dao.ProductDao;
import com.carssps.model.Product;
import com.carssps.service.ProductService;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private ProductDao productDao;
	
	@Override
	public Product findById(int id) {
		return productDao.findById(id).get();
	}

	@Override
	public List<Product> findAll() {
		List<Product> products = new ArrayList<>();
		productDao.findAll().forEach(products::add);
		return products;
	}

	@Override
	public List<Product> findAllById(List<Integer> ids) {
		List<Product> products = new ArrayList<>();
		productDao.findAllById(ids).forEach(products::add);
		return products;
	}
	
	@Override
	public List<Product> findByKeyword(String keyword) {
		return productDao.findByKeyword(keyword);
	}
}
