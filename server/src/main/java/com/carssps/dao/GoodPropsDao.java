package com.carssps.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.carssps.model.ProductProp;

@Repository
public interface GoodPropsDao extends CrudRepository<ProductProp, Integer> {

}
