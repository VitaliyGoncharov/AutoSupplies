package com.carssps.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carssps.model.Customer;

@Repository
public interface CustomerDao extends JpaRepository<Customer, Integer> {
}
