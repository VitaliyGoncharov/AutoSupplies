package com.carssps.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.dao.GoodPropsDao;
import com.carssps.dao.GoodPropsTitlesDao;
import com.carssps.dao.ProductDao;
import com.carssps.model.Product;
import com.carssps.model.User;
import com.carssps.model.response.TokenRequest;
import com.carssps.model.response.TokenResponse;
import com.carssps.service.UserService;
import com.carssps.util.JwtTokenUtil;

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
	private GoodPropsDao goodProps;
	
	@Autowired
	private GoodPropsTitlesDao goodPropsTitles;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	
	
	@RequestMapping(value = "/credits", method = RequestMethod.POST)
	public String getCredits() {
		return "{\"message\":\"This app was build by Vitaliy!\"}";
	}
	
	@RequestMapping(value = "/version", method = RequestMethod.GET)
	public String getInfo() {
		return "{\"message\":\"v.0.0.1\"}";
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
	 * 
	 * |Token                |
	 * |---------------------|
	 * |INT id               |
	 * |VARCHAR appName		 |
	 * |VARCHAR refreshToken |
	 * |BIGINT  expiration   |
	 */
	@RequestMapping(value = "/token", method = RequestMethod.POST)
	public ResponseEntity<?> register(@RequestBody TokenRequest tokenRequest) throws Exception {
		TokenResponse tokenResponse = null;
		final User user;
		
		if (tokenRequest.getGrant_type().equals("password")) {
			user = userService.findOne(tokenRequest.getUsername());
			
			String rawPassword = tokenRequest.getPassword();
			String encodedPassword = user.getPassword();
			
			if (!encoder.matches(rawPassword, encodedPassword)) {
				throw new Exception(getClass().getCanonicalName() + " Invalid credentials!");
			}
			
			String token = jwtTokenUtil.generateToken(user);
			tokenResponse = new TokenResponse();
			tokenResponse.setAccess_token(token);
			
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
