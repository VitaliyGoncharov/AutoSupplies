package com.carssps.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.model.User;
import com.carssps.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping("/user")
	public ResponseEntity<User> getUser(HttpServletRequest request) throws Exception {
		Principal principal = request.getUserPrincipal();
		User user = userService.findOne(principal.getName());
		
		if (user == null) {
			throw new Exception("User not found");
		}
		
		return ResponseEntity.ok(user);
	}
}
