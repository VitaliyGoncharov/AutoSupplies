package com.carssps.service;

import java.util.List;

import com.carssps.model.CatalogProduct;

public interface CatalogProductService {
	List<CatalogProduct> getPortion(int catalogId, int offset, int limit);
	CatalogProduct findByCatalogIdAndProductId(int catalogId, int productId);
	CatalogProduct save(CatalogProduct catalogProduct);
}
