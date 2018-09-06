package com.carssps.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carssps.model.RefreshToken;
import com.carssps.model.User;

@Repository
public interface RefreshTokenDao extends JpaRepository<RefreshToken, Integer> {
	RefreshToken findByUser(User user);
	RefreshToken findByUserAndToken(User user, String token);
}
