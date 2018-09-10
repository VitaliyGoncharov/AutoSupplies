package com.carssps.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.model.User;
import com.carssps.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping("/user")
	public ResponseEntity<User> getUser() throws Exception {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userService.findOne(email);
		
		if (user == null) {
			throw new Exception("User not found");
		}
		
		return ResponseEntity.ok(user);
	}
}
