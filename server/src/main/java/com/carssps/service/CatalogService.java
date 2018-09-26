package com.carssps.service;

import java.util.List;
import java.util.Map;

import com.carssps.model.Catalog;

public interface CatalogService {
	Catalog findByPathName(String pathName);
	Catalog findById(Integer id);
	List<Catalog> findAll();
	int countCatalogItems(String catalogPathName);
	Map<Integer, Catalog> mapToTree(List<Catalog> catalogs);
	Map<Integer, Catalog> mapToTree(List<Catalog> catalogs, String rootCatalog);
}
