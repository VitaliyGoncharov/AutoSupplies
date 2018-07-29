package com.carssps.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.carssps.dao.RoleDao;
import com.carssps.dao.UserDao;
import com.carssps.model.Role;
import com.carssps.model.User;
import com.carssps.service.UserService;

@Service(value = "userService")
public class UserServiceImpl implements UserService, UserDetailsService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private RoleDao roleDao;
	
	@Autowired
	private PasswordEncoder encoder;
	
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("figured it out!");
		User user = userDao.findByUsername(username);
		Set<Role> roles = user.getRoles();
		
		if (user == null) {
			throw new UsernameNotFoundException("Invalid username or password");
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthorities(roles));
	}
	
	public Set<? extends GrantedAuthority> getAuthorities(Set<Role> roles) {
		Set<SimpleGrantedAuthority> authContextRoles = new HashSet<>();
		for (Role role : roles) {
			authContextRoles.add(new SimpleGrantedAuthority(role.getName()));
		}
		return authContextRoles;
	}
	
	@Override
	public User save(User user) {
		Role defaultRole = roleDao.findByName("ROLE_USER");
		
		String encodedPassword = encoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		user.setRoles(new HashSet<Role>(Arrays.asList(defaultRole)));
		return userDao.save(user);
	}

	@Override
	public List<User> findAll() {
		List<User> list = new ArrayList<>();
		userDao.findAll().iterator().forEachRemaining(list::add);
		return list;
	}

	@Override
	public void delete(Long id) {
		userDao.deleteById(id);
	}

	@Override
	public User findOne(String username) {
		return userDao.findByUsername(username);
	}

	@Override
	public User findById(Long id) {
		return userDao.findById(id).get();
	}
	
}
