package com.carssps.dao;

import org.springframework.data.repository.CrudRepository;

import com.carssps.model.Role;

public interface RoleDao extends CrudRepository<Role, Integer> {
	Role findByName(String name);
}
