package com.carssps.service;

import java.util.List;

import com.carssps.model.Role;

public interface RoleService {
	Role findById(int id);
	Role findByName(String name);
	List<Role> findAll();
	
	Role save(Role role);
	void deleteByName(String name);
}
