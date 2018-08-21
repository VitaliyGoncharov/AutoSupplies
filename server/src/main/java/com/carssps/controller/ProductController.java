package com.carssps.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.model.Product;
import com.carssps.service.ProductService;

@RestController
public class ProductController {
	
	@Autowired
	private ProductService productService;

	@RequestMapping("/search/product")
	public ResponseEntity<Product> findByKeyword(@RequestParam String keyword) {
		return ResponseEntity.ok(productService.findByKeyword(keyword));
	}
}
