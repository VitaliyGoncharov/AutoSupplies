package com.carssps.service;

import java.util.List;

import com.carssps.model.CatalogProduct;

public interface CatalogProductService {
	List<CatalogProduct> getPortionByCatalogIdWithLimitAndOffset(int catalogId, int offset, int limit);
}
