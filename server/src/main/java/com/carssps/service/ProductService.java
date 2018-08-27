package com.carssps.service;

import java.util.List;
import com.carssps.model.Product;

public interface ProductService {
	Product findById(int id);
	List<Product> findAll();
	List<Product> findAllById(List<Integer> ids);
	List<Product> findByKeyword(String keyword);
}
