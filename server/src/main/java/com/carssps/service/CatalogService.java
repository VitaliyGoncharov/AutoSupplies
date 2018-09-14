package com.carssps.service;

import com.carssps.model.Catalog;

public interface CatalogService {
	Catalog findByPathName(String pathName);
}
