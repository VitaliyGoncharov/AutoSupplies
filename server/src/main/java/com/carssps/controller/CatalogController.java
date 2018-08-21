package com.carssps.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.model.Product;
import com.carssps.service.ProductService;

@RestController
@RequestMapping("/api")
public class CatalogController {
	
	@Autowired
	private ProductService productService;
	
	@RequestMapping(value = "/catalog/oil-and-grease", method = RequestMethod.GET)
	public ResponseEntity<List<Product>> getItems() {
		List<Product> products = productService.findAll();
		return ResponseEntity.ok(products);
	}
	
	@RequestMapping(value = "/catalog/oil-and-grease/specific", method = RequestMethod.GET)
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
