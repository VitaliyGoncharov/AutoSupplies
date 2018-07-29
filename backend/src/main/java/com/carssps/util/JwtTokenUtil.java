package com.carssps.util;

import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.carssps.model.Role;
import com.carssps.model.User;
import com.carssps.service.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;

@Component
public class JwtTokenUtil {
	protected final Log logger = LogFactory.getLog(getClass());
	
	@Value("${app.signing_key}")
	private String SIGNING_KEY;
	
	@Autowired
	private UserService userService;
	
	public String generateToken(User user) {
		Set<String> roles = new HashSet<>();
		
		for (Role role : user.getRoles()) {
			roles.add(role.getName());
		}
		
		Claims claims = Jwts.claims().setSubject(user.getUsername());
		claims.put("authorities", roles);
		return Jwts.builder()
				.setClaims(claims)
				.signWith(SignatureAlgorithm.HS512, SIGNING_KEY)
				.compact();
	}
	
	public Claims parse(String compactJws) {
		Claims claims = null;
		try {
			 claims = Jwts.parser().setSigningKey(SIGNING_KEY).parseClaimsJws(compactJws).getBody();
		} catch (SignatureException e) {
			e.printStackTrace();
		}
		
		logger.info("Getting claims!");
		
		return claims;
	}
}
