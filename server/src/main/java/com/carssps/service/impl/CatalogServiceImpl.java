package com.carssps.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carssps.dao.CatalogDao;
import com.carssps.model.Catalog;
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
	public Catalog findByPathName(String pathName) {
		return catalogDao.findByPathName(pathName); 
	}
	
}
