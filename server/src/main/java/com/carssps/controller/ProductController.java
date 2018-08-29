package com.carssps.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import com.carssps.model.Product;
import com.carssps.model.request.ProductSearchReq;
import com.carssps.service.ProductService;

@RestController
@RequestMapping("/api")
public class ProductController {
	
	@Autowired
	private ProductService productService;

	@RequestMapping(value = "/search/product", method = RequestMethod.POST)
	public ResponseEntity<List<Product>> findByKeyword(@RequestBody ProductSearchReq productSearchReq) {
		return ResponseEntity.ok(productService.findByKeyword(productSearchReq.getKeyword()));
	}
}
