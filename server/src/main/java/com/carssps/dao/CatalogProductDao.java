package com.carssps.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.carssps.model.CatalogProduct;

@Repository
public interface CatalogProductDao extends JpaRepository<CatalogProduct, Integer> {
	
	@Query("SELECT * FROM catalog_product WHERE catalog_id = :catalogId LIMIT :offset, :limit")
	List<CatalogProduct> getPortionByCatalogIdWithLimitAndOffset(
			@Param("catalogId") int catalogId,
			@Param("offset") int offset,
			@Param("limit") int limit);
}
