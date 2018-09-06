package com.carssps.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.dao.GoodPropsDao;
import com.carssps.dao.GoodPropsTitlesDao;
import com.carssps.dao.ProductDao;
import com.carssps.model.RefreshToken;
import com.carssps.model.User;
import com.carssps.model.response.TokenRequest;
import com.carssps.model.response.TokenResponse;
import com.carssps.service.RefreshTokenService;
import com.carssps.service.UserService;
import com.carssps.util.JwtTokenUtil;
import com.carssps.util.TokenUtil;

@RestController
@RequestMapping("/api")
public class HomeController {
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private TokenUtil tokenUtil;
	
	@Autowired
	private RefreshTokenService refreshTokenService;
	
	@RequestMapping(value = "/password", method = RequestMethod.GET)
	public String getInfo(@RequestParam String password) {
		return passwordEncoder.encode(password);
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public String register(@RequestBody User user) {
		userService.save(user);
		return "{\"message\":\"You were successfully registered!\"}";
	}
	
	/**
	 * I used architecture for token request and response from here:
	 * =======================================
	 * https://auth0.com/learn/refresh-tokens/
	 * =======================================
	 */
	@RequestMapping(value = "/token", method = RequestMethod.POST)
	public ResponseEntity<?> login(@RequestBody TokenRequest tokenRequest, HttpServletRequest request) throws Exception {
		TokenResponse tokenResponse = null;
		
		if (tokenRequest.getGrant_type().equals("password"))
			tokenResponse = this.getTokens(tokenRequest, request);
		
		if (tokenRequest.getGrant_type().equals("refresh_token"))
			tokenResponse = this.refreshTokens(tokenRequest, request);
		
		return ResponseEntity.ok(tokenResponse);
	}
	
	public TokenResponse getTokens(TokenRequest tokenRequest, HttpServletRequest request) throws Exception {
		final User user = userService.findOne(tokenRequest.getEmail());

		if (user == null)
			throw new Exception(getClass().getCanonicalName() + " User not found");
		
		String rawPassword = tokenRequest.getPassword();
		String encodedPassword = user.getPassword();
		
		if (!encoder.matches(rawPassword, encodedPassword)) {
			throw new Exception(getClass().getCanonicalName() + " Invalid credentials!");
		}
		
		String accessToken = jwtTokenUtil.generateToken(user);
		String refreshToken = jwtTokenUtil.generateRefreshToken(user);
		String userAgent = request.getHeader("User-Agent");
		int exp = jwtTokenUtil.getRefreshTokenExp(refreshToken);
		
		RefreshToken refreshTokenDB = refreshTokenService.findByUser(user);
		
		if (refreshTokenDB == null) {
			refreshTokenService.save(new RefreshToken(user, refreshToken, exp, userAgent));
		} else {
			refreshTokenDB.setToken(refreshToken);
			refreshTokenDB.setExp(exp);
			refreshTokenDB.setDevice(userAgent);
			refreshTokenService.save(refreshTokenDB);
		}
			
		
		return new TokenResponse("password", accessToken, refreshToken);
	}
	
	/**
	 * 1. Find refresh token in database
	 * 2. Check its expiration time
	 * :: Continue if refresh token is not expired
	 * 3. Generate new refresh token and update record in database with new token and expiration time
	 * 4. Generate new access token
	 * 5. Return access token with refresh token and expiration time of access token
	 * 
	 * @param TokenRequest tokenRequest
	 * @return TokenResponse tokenResponse
	 */
	public TokenResponse refreshTokens(TokenRequest tokenRequest, HttpServletRequest request) throws Exception {
		String refreshToken, accessToken, userAgent;
		final User user;
		
		if ((refreshToken = tokenRequest.getRefresh_token()) == null)
			throw new Exception(getClass().getCanonicalName() + " Refresh token is required!");
		
		user = userService.findOne(jwtTokenUtil.getSubject(refreshToken));
		if (user == null)
			throw new Exception(getClass().getCanonicalName() + " User not found");
		
		RefreshToken refreshTokenDB = refreshTokenService.findByUserAndToken(user, refreshToken);
		
		if (refreshTokenDB == null)
			throw new Exception(getClass().getCanonicalName() + " Couldn't find refresh token!");
		if (refreshTokenDB.getExp() < System.currentTimeMillis() / 1000L)
			throw new Exception(getClass().getCanonicalName() + " Refresh token is expired!");
		
		accessToken = jwtTokenUtil.generateToken(user);
		refreshToken = jwtTokenUtil.generateRefreshToken(user);
		userAgent = request.getHeader("User-Agent");
		
		int exp = jwtTokenUtil.getRefreshTokenExp(refreshToken);
		refreshTokenDB.setToken(refreshToken);
		refreshTokenDB.setExp(exp);
		refreshTokenDB.setDevice(userAgent);
		refreshTokenService.save(refreshTokenDB);
		
		return new TokenResponse("refresh_token", accessToken, refreshToken);
	}
}
