package com.carssps.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.carssps.service.ProductService;

@RestController
@RequestMapping("/api")
public class CatalogController {
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private CatalogService catalogService;
	
	@Autowired CatalogProductService catalogProductService;
	
	@GetMapping(value = "/catalogs")
	public ResponseEntity<Map<Integer, Catalog>> getCatalogs() {
		List<Catalog> catalogs = catalogService.findAll();
		return ResponseEntity.ok(catalogService.mapToTree(catalogs));
	}
	/**
	 * This should be POST request
	 * 
	 * @param catalogPathName
	 * @param productId
	 * @return
	 */
	@GetMapping(value = "/catalog/item/add")
	public boolean addItemToCatalog(
			@RequestParam("catalog") String catalogPathName,
			@RequestParam("productId") Integer productId) {
		Catalog catalog = catalogService.findByPathName(catalogPathName);
		CatalogProduct catalogProduct = catalogProductService.findByCatalogIdAndProductId(catalog.getId(), productId);
		if (catalogProduct != null) {
			return true;
		}
		Product product = productService.findById(productId);
		catalogProduct = new CatalogProduct();
		catalogProduct.setCatalog(catalog);
		catalogProduct.setProduct(product);
		catalogProductService.save(catalogProduct);
		return false;
	}
	
	@GetMapping(value = "/catalog/{catalogPathName}/items/count")
	public ResponseEntity<Integer> getItemsAmount(@PathVariable String catalogPathName) {
		return ResponseEntity.ok(catalogService.countCatalogItems(catalogPathName));
	}
	
	@GetMapping(value = "/catalog/items")
	public ResponseEntity<List<Product>> getCatalogItems(
			@RequestParam("catalog") String catalogPathName,
			@RequestParam("page") Integer curPage,
			@RequestParam("limit") Integer itemsPerPage) {
		
		int totalItems = catalogService.countCatalogItems(catalogPathName);
		int catalogId = catalogService.findByPathName(catalogPathName).getId();
		
		if (curPage < 1) {
			curPage = 1;
		} else if (curPage > totalItems) {
			curPage = totalItems;
		}
		
		int offset = (curPage - 1) * itemsPerPage;
		List<CatalogProduct> catalogProducts = catalogProductService.getPortion(catalogId, offset, itemsPerPage);
		List<Product> products = new ArrayList<>();
		for (CatalogProduct catalogProduct : catalogProducts) {
			products.add(catalogProduct.getProduct());
		}
		
		return ResponseEntity.ok(products);
	}
	
	@GetMapping(value = "/catalog/id/{id}")
	public ResponseEntity<Catalog> getCatalogById(@PathVariable("id") Integer id) {
		return ResponseEntity.ok(catalogService.findById(id));
	}
	
	@GetMapping(value = "/catalog/list/{catName}")
	public ResponseEntity<Map<Integer, Catalog>> getSubCatalogs(@PathVariable("catName") String rootCatalog) {
		List<Catalog> catalogs = catalogService.findAll();
		return ResponseEntity.ok(catalogService.mapToTree(catalogs, rootCatalog));
	}
	
	@GetMapping(value = "/catalog/{catName}")
	public ResponseEntity<List<Product>> getCatalogItems(@PathVariable("catName") String catName) {
		Catalog catalog = catalogService.findByPathName(catName);
		List<Product> products = new ArrayList<>();
		for (CatalogProduct catalogProduct : catalog.getCatalogProducts()) {
			products.add(catalogProduct.getProduct());
		}
		return ResponseEntity.ok(products);
	}
}
