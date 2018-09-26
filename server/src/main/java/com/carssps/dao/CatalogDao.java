package com.carssps.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.carssps.model.Catalog;

@Repository
public interface CatalogDao extends JpaRepository<Catalog, Integer> {
	Catalog findByPathName(String pathName);
	
	@Query("SELECT COUNT(*) FROM catalog_product WHERE catalog_id = :catalogId")
	int countCatalogItems(@Param("catalogId") int catalogId);
}
