package com.carssps.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carssps.model.Catalog;

@Repository
public interface CatalogDao extends JpaRepository<Catalog, Integer> {
	Catalog findByPathName(String pathName);
}
