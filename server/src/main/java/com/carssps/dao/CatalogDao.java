package com.carssps.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.carssps.model.Catalog;

@Repository
public interface CatalogDao extends JpaRepository<Catalog, Integer> {
	Catalog findByPathName(String pathName);
	
	@Query("SELECT COUNT(cp) FROM CatalogProduct cp WHERE cp.catalog = :catalog")
	int countCatalogItems(@Param("catalog") Catalog catalog);
}
