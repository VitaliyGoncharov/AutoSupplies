package com.carssps.service;

import java.util.List;

import com.carssps.model.Catalog;

public interface CatalogService {
	Catalog findByPathName(String pathName);
	List<Catalog> findAll();
}
