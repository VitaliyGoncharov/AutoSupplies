package com.carssps.service;

import com.carssps.model.RefreshToken;
import com.carssps.model.User;

public interface RefreshTokenService {
	RefreshToken findByUserAndTokenAndDevice(User user, String token, String device);
	RefreshToken save(RefreshToken refreshToken);
}
