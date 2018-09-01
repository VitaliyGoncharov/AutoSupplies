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
	public ResponseEntity<?> register(@RequestBody TokenRequest tokenRequest, HttpServletRequest request) throws Exception {
		TokenResponse tokenResponse = null;
		final User user;
		
		if (tokenRequest.getGrant_type().equals("password")) {
			user = userService.findOne(tokenRequest.getEmail());
			
			
			String rawPassword = tokenRequest.getPassword();
			String encodedPassword = user.getPassword();
			
			if (!encoder.matches(rawPassword, encodedPassword)) {
				throw new Exception(getClass().getCanonicalName() + " Invalid credentials!");
			}
			
			String accessToken = jwtTokenUtil.generateToken(user);
			String refreshToken = tokenUtil.generateToken();
			
			tokenResponse = new TokenResponse();
			tokenResponse.setAccess_token(accessToken);
			tokenResponse.setRefresh_token(refreshToken);
			
			int exp = jwtTokenUtil.getRefreshTokenExp(accessToken);
			String userAgent = request.getHeader("User-Agent");
			refreshTokenService.save(new RefreshToken(user, refreshToken, exp, userAgent));
			
			/**
			 * TODO
			 * 
			 * 1. Generate access token
			 * 2. Generate refresh token (random value, 14 characters)
			 * 3. Persist refresh token and its expiration time to the database 
			 * 4. Return access token with refresh token and expiration time of access token
			 *    Client actually doesn't have to know expiration time of refresh token
			 */
		}
		
		if (tokenRequest.getGrant_type().equals("refresh_token")) {
			// TODO Update token if refresh token is valid
			
			/**
			 * TODO
			 * 
			 * 1. Find refresh token in database
			 * 2. Check its expiration time
			 * :: Continue if refresh token is not expired
			 * 3. Generate new refresh token and update record in database with new token and expiration time
			 * 4. Generate new access token
			 * 5. Return access token with refresh token and expiration time of access token
			 * 	  Client actually doesn't have to know expiration time of refresh token
			 */
		}
		
		return ResponseEntity.ok(tokenResponse);
	}
}
