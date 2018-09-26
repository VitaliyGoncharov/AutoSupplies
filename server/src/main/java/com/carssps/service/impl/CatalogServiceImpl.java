package com.carssps.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carssps.dao.CatalogDao;
import com.carssps.model.Catalog;
import com.carssps.model.Product;
import com.carssps.service.CatalogService;

@Service
@Transactional
public class CatalogServiceImpl implements CatalogService {
	
	@Autowired
	private CatalogDao catalogDao;
	
	@Override
	public List<Catalog> findAll() {
		 return catalogDao.findAll();
	}
	
	@Override
	public Catalog findById(Integer id) {
		return catalogDao.findById(id).get();
	}

	@Override
	public Catalog findByPathName(String pathName) {
		return catalogDao.findByPathName(pathName); 
	}
	
	public Map<Integer, Catalog> mapToTree(List<Catalog> catalogs) {
		Map<Integer, Catalog> catalogMap = new HashMap<>();
		for (Catalog catalog : catalogs) {
			catalogMap.put(catalog.getId(), catalog);
		}
		return getTree(catalogMap);
	}
	
	public Map<Integer, Catalog> mapToTree(List<Catalog> catalogs, String rootCatalog) {
		Map<Integer, Catalog> catalogMap = new HashMap<>();
		for (Catalog catalog : catalogs) {
			catalogMap.put(catalog.getId(), catalog);
		}
		Map<Integer, Catalog> mapWithRoot = getTree(catalogMap, rootCatalog);
		return mapWithRoot;
	}
	
	public Map<Integer, Catalog> getTree(Map<Integer, Catalog> dataset) {
		Map<Integer, Catalog> tree = new HashMap<>();
		for (Map.Entry<Integer, Catalog> entry : dataset.entrySet()) {
			Catalog catalog = entry.getValue();
			int catalogId = catalog.getId();
			int parentId = entry.getValue().getParentId();
			
			if (parentId == 0) {
				tree.put(catalogId, catalog);
			} else {
				Map<Integer, Catalog> childs = dataset.get(parentId).getChilds();
				if (childs == null) {
					childs = new HashMap<>();
				}
				childs.put(catalogId, catalog);
				dataset.get(parentId).setChilds(childs);
			}
		}
		return tree;
	}
	
	public Map<Integer, Catalog> getTree(Map<Integer, Catalog> dataset, String rootCatalog) {
		Map<Integer, Catalog> tree = new HashMap<>();
		for (Map.Entry<Integer, Catalog> entry : dataset.entrySet()) {
			Catalog catalog = entry.getValue();
			int catalogId = catalog.getId();
			int parentId = entry.getValue().getParentId();
			
			if (catalog.getPathName().equals(rootCatalog)) {
				tree.put(catalogId, catalog);
			} else if (parentId != 0){
				Map<Integer, Catalog> childs = dataset.get(parentId).getChilds();
				if (childs == null) {
					childs = new HashMap<>();
				}
				childs.put(catalogId, catalog);
				dataset.get(parentId).setChilds(childs);
			}
		}
		return tree;
	}
	
	public int countCatalogItems(String catalogPathName) {
		Catalog catalog = this.findByPathName(catalogPathName);
		return catalogDao.countCatalogItems(catalog.getId());
	}
}
