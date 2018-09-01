package com.carssps.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carssps.dao.RefreshTokenDao;
import com.carssps.model.RefreshToken;
import com.carssps.model.User;
import com.carssps.service.RefreshTokenService;

@Service
@Transactional
public class RefreshTokenServiceImpl implements RefreshTokenService {
	
	@Autowired
	private RefreshTokenDao refreshTokenDao;

	@Override
	public RefreshToken findByUserAndTokenAndDevice(User user, String token, String device) {
		return refreshTokenDao.findByUserAndTokenAndDevice(user, token, device);
	}

	@Override
	public RefreshToken save(RefreshToken refreshToken) {
		return refreshTokenDao.save(refreshToken);
	}
}
