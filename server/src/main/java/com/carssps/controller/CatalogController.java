package com.carssps.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.model.Catalog;
import com.carssps.model.Product;
import com.carssps.service.CatalogService;

@RestController
@RequestMapping("/api")
public class CatalogController {
	
	@Autowired
	private CatalogService catalogService;
	
	@RequestMapping(value = "/catalog/{catName}", method = RequestMethod.GET)
	public ResponseEntity<List<Product>> getItems(@PathVariable("catName") String catName) {
		Catalog catalog = catalogService.findByPathName(catName); 
		return ResponseEntity.ok(catalog.getProducts());
	}
	
//	@RequestMapping(value = "/catalog/oil-and-grease/specific", method = RequestMethod.GET)
//	public ResponseEntity<List<Product>> getItemsByIds(@RequestParam String ids) {
//		String[] idsStringArray = ids.split(",");
//		Integer[] idsIntArray = new Integer[idsStringArray.length];
//		for (int i = 0; i < idsIntArray.length; i++) {
//			idsIntArray[i] = Integer.parseInt(idsStringArray[i]);
//		}
//		List<Integer> iterableIds = Arrays.asList(idsIntArray);
//		
//		List<Product> products = productService.findAllById(iterableIds);
//		return ResponseEntity.ok(products);
//	}
}
