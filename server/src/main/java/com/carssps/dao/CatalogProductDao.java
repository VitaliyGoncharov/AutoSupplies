package com.carssps.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.carssps.model.CatalogProduct;

@Repository
public interface CatalogProductDao extends JpaRepository<CatalogProduct, Integer> {
	
	@Query(value = "SELECT * FROM catalog_product cp WHERE cp.catalog_id = :catalogId LIMIT :limit OFFSET :offset",
			nativeQuery = true)
	List<CatalogProduct> getPortionByCatalogIdWithLimitAndOffset(
			@Param("catalogId") int catalogId,
			@Param("offset") int offset,
			@Param("limit") int limit);
	
	@Query(value = "SELECT * FROM catalog_product cp WHERE cp.catalog_id = :catalogId AND cp.product_id = :productId",
			nativeQuery = true)
	CatalogProduct findByCatalogIdAndProductId(@Param("catalogId") int catalogId, @Param("productId") int productId);
}
