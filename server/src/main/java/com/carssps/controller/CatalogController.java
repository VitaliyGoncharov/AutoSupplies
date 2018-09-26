package com.carssps.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.model.Catalog;
import com.carssps.model.CatalogProduct;
import com.carssps.model.Product;
import com.carssps.service.CatalogProductService;
import com.carssps.service.CatalogService;

@RestController
@RequestMapping("/api")
public class CatalogController {
	
	@Autowired
	private CatalogService catalogService;
	
	@Autowired CatalogProductService catalogProductService;
	
	@RequestMapping(value = "/catalogs")
	public ResponseEntity<Map<Integer, Catalog>> getCatalogs() {
		List<Catalog> catalogs = catalogService.findAll();
		return ResponseEntity.ok(catalogService.mapToTree(catalogs));
	}
	
	@RequestMapping(value = "/catalog/{catalogPathName}/items/count")
	public ResponseEntity<Integer> getItemsAmount(@PathVariable String catalogPathName) {
		return ResponseEntity.ok(catalogService.countCatalogItems(catalogPathName));
	}
	
	@RequestMapping(value = "/catalog/items")
	public ResponseEntity<List<Product>> getCatalogItems(
			@RequestParam("catalog") String catalogPathName,
			@RequestParam("page") Integer curPage) {
		
		int itemsPerPage = 3;
		int totalItems = catalogService.countCatalogItems(catalogPathName);
		int catalogId = catalogService.findByPathName(catalogPathName).getId();
		
		
		if (curPage < 1) {
			curPage = 1;
		} else if (curPage > totalItems) {
			curPage = totalItems;
		}
		
		int offset = (curPage - 1) * itemsPerPage;
		List<CatalogProduct> catalogProducts = catalogProductService.getPortionByCatalogIdWithLimitAndOffset(
				catalogId, offset, itemsPerPage);
		List<Product> products = new ArrayList<>();
		for (CatalogProduct catalogProduct : catalogProducts) {
			products.add(catalogProduct.getProduct());
		}
		
		return ResponseEntity.ok(products);
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
		List<Product> products = new ArrayList<>();
		for (CatalogProduct catalogProduct : catalog.getProducts()) {
			products.add(catalogProduct.getProduct());
		}
		return ResponseEntity.ok(products);
	}
}
