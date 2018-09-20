package com.carssps.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

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
	
	@RequestMapping(value = "/catalogs")
	public ResponseEntity<Map<Integer, Catalog>> getCatalogs() {
		List<Catalog> catalogs = catalogService.findAll();
		return ResponseEntity.ok(catalogService.mapToTree(catalogs));
	}
	
	@RequestMapping(value = "/catalog/id/{id}")
	public ResponseEntity<Catalog> getCatalogById(@PathVariable("id") Integer id) {
		return ResponseEntity.ok(catalogService.findById(id));
	}
	
	@RequestMapping(value = "/catalog/list/{catName}")
	public ResponseEntity<Map<Integer, Catalog>> getSubCatalogs(@PathVariable("catName") String rootCatalog) {
		List<Catalog> catalogs = catalogService.findAll();
		return ResponseEntity.ok(catalogService.mapToTree(catalogs, rootCatalog));
	}
	
	@RequestMapping(value = "/catalog/{catName}", method = RequestMethod.GET)
	public ResponseEntity<List<Product>> getCatalogItems(@PathVariable("catName") String catName) {
		Catalog catalog = catalogService.findByPathName(catName); 
		return ResponseEntity.ok(catalog.getProducts());
	}
}
