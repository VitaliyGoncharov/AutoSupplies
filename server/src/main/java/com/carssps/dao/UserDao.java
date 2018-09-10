package com.carssps.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.carssps.model.User;

@Repository
public interface UserDao extends CrudRepository<User, Long> {
	User findByEmail(String email);
}
