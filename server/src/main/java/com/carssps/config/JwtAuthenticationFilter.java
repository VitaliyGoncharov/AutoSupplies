package com.carssps.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import com.carssps.auth.UserPrinciple;
import com.carssps.service.UserService;
import com.carssps.util.JwtTokenUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	@SuppressWarnings("unchecked")
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String header = request.getHeader("Authorization");
		String username = null;
		Integer exp = null;
		String authToken = null;
		List<String> authorities = null;
		
		if (header != null) {
			System.out.println(header);
			authToken = header;
			try {
				Claims claims = jwtTokenUtil.parse(authToken);
				username = claims.getSubject();
				exp = (int) claims.get("exp");
				authorities = claims.get("authorities", ArrayList.class);
			} catch(Exception e) { }
			this.setAuthenticated(username, authorities, exp);
		}
		
		filterChain.doFilter(request, response);
	}
	
	private void setAuthenticated(String username, List<String> authorities, Integer exp) {
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null 
				&& exp > (System.currentTimeMillis() / 1000L)) {
			System.out.println("Jwt token isn't expired");
			Set<SimpleGrantedAuthority> contextAuthorities = new HashSet<>();
			for (String authority : authorities) {
				contextAuthorities.add(new SimpleGrantedAuthority(authority));
			}
			UserPrinciple user = new UserPrinciple(username, contextAuthorities);
			UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null, contextAuthorities);
			SecurityContextHolder.getContext().setAuthentication(auth);
		}
	}
}
