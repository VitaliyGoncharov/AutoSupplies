package com.carssps.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.carssps.dao.RoleDao;
import com.carssps.model.Role;
import com.carssps.service.RoleService;

public class RoleServiceImpl implements RoleService {
	
	@Autowired
	private RoleDao roleDao;

	@Override
	public Role findById(int id) {
		return roleDao.findById(id).get();
	}

	@Override
	public Role findByName(String name) {
		return roleDao.findByName(name);
	}

	@Override
	public List<Role> findAll() {
		List<Role> roles = new ArrayList<>();
		roleDao.findAll().forEach(roles::add);
		return roles;
	}

	@Override
	public Role save(Role role) {
		return roleDao.save(role);
	}

	@Override
	public void deleteByName(String name) {
		Role role = findByName(name);
		roleDao.delete(role);
	}
}
