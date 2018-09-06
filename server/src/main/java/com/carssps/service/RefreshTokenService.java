package com.carssps.service;

import com.carssps.model.RefreshToken;
import com.carssps.model.User;

public interface RefreshTokenService {
	RefreshToken findByUser(User user);
	RefreshToken findByUserAndToken(User user, String token);
	RefreshToken save(RefreshToken refreshToken);
}
