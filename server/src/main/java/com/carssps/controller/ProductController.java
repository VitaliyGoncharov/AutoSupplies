package com.carssps.controller;

import java.util.Arrays;
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
	
	@RequestMapping(value = "/products", method = RequestMethod.GET)
	public ResponseEntity<List<Product>> getItemsByIds(@RequestParam String ids) {
		String[] idsStringArray = ids.split(",");
		Integer[] idsIntArray = new Integer[idsStringArray.length];
		for (int i = 0; i < idsIntArray.length; i++) {
			idsIntArray[i] = Integer.parseInt(idsStringArray[i]);
		}
		List<Integer> iterableIds = Arrays.asList(idsIntArray);
		
		List<Product> products = productService.findAllById(iterableIds);
		return ResponseEntity.ok(products);
	}
}
