package com.carssps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carssps.dao.CatalogProductDao;
import com.carssps.model.CatalogProduct;
import com.carssps.service.CatalogProductService;

@Service
public class CatalogProductServiceImpl implements CatalogProductService {
	
	@Autowired
	private CatalogProductDao catalogProductDao;

	@Override
	public List<CatalogProduct> getPortionByCatalogIdWithLimitAndOffset(int catalogId, int offset, int limit) {
		return catalogProductDao.getPortionByCatalogIdWithLimitAndOffset(catalogId, offset, limit);
	}
}
