package com.carssps.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.carssps.model.Product;
import com.carssps.model.Role;

@Repository
public interface ProductDao extends CrudRepository<Product, Integer>{
	
	@Query(value = "SELECT * FROM product where title @@ to_tsquery(?1)",
			nativeQuery=true)
	List<Product> findByKeyword(String keyword);
}