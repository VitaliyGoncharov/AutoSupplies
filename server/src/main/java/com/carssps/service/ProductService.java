package com.carssps.service;

import java.util.List;
import com.carssps.model.Product;

public interface ProductService {
	List<Product> findAll();
	List<Product> findAllById(List<Integer> ids);
	Product findByKeyword(String keyword);
}
