package com.carssps.auth;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrinciple implements UserDetails {
	
	private final String username;
	private final Set<GrantedAuthority> authorities;
	private final boolean accountNonExpired;
	private final boolean accountNonLocked;
	private final boolean credentialsNonExpired;
	private final boolean enabled;
	
	
	public UserPrinciple(String username, Collection<? extends GrantedAuthority> authorities) {
		Set<GrantedAuthority> authoritiesSet = new HashSet<>();
		authorities.stream().map(authority -> authoritiesSet.add(authority));
		this.username = username;
		this.authorities = Collections.unmodifiableSet(authoritiesSet);
		this.enabled = true;
		this.accountNonExpired = true;
		this.credentialsNonExpired = true;
		this.accountNonLocked = true;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return this.credentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return this.enabled;
	}
	
}
