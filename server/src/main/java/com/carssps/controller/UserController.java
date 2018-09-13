package com.carssps.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carssps.model.User;
import com.carssps.model.request.UserEditReq;
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
	
	@RequestMapping("/user/edit")
	public ResponseEntity<Long> editUser(@RequestBody UserEditReq userEditReq) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userService.findOne(authentication.getName());
		String pwd;
		
		if (user == null) {
			throw new Exception("User not found");
		}
		
		user.setFirstname(userEditReq.getFirstname());
		user.setLastname(userEditReq.getLastname());
		user.setGender(userEditReq.getGender());
		user.setBirth(userEditReq.getBirth());
		user.setAddress(userEditReq.getAddress());
		user.setPhone(userEditReq.getPhone());
		
		if ((pwd = userEditReq.getPassword()) != null) {
			user.setPassword(pwd);
		}
		
		User updatedUser = userService.update(user);
		return ResponseEntity.ok(updatedUser.getId());
	}
}