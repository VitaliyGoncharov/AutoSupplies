package com.carssps.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.carssps.model.ProductPropTitle;

@Repository
public interface GoodPropsTitlesDao extends CrudRepository<ProductPropTitle, Integer>{

}
