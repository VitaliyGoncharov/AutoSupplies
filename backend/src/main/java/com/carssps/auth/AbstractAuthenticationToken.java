package com.carssps.auth;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

public abstract class AbstractAuthenticationToken implements Authentication, CredentialsContainer {
	
	private final Collection<GrantedAuthority> authorities;
	private Object details;
	private boolean authenticated = false;
	
	public AbstractAuthenticationToken(Collection<? extends GrantedAuthority> authorities) {
		// it just created an empty list of authorities
		if (authorities == null) {
			this.authorities = AuthorityUtils.NO_AUTHORITIES;
			return;
		}
		
		for (GrantedAuthority a : authorities) {
			if (a == null) {
				throw new IllegalArgumentException("Authorities collection cannot contain any null elements");
			}
		}
		
		ArrayList<GrantedAuthority> temp = new ArrayList<>(authorities.size());
		temp.addAll(authorities);
		this.authorities = Collections.unmodifiableList(temp);
	}
	
	public Collection<GrantedAuthority> getAuthorities() {
		return authorities;
	}
	
	public String getName() {
		if (this.getPrincipal() instanceof UserDetails) {
			return ((UserDetails) this.getPrincipal()).getUsername();
		}
		if (this.getPrincipal() instanceof AuthenticatedPrincipal) {
			return ((AuthenticatedPrincipal) this.getPrincipal()).getName();
		}
		if (this.getPrincipal() instanceof Principal) {
			return ((Principal) this.getPrincipal()).getName();
		}
		
		return (this.getPrincipal() == null) ? "" : this.getPrincipal().toString();
	}
	
	public boolean isAuthenticated() {
		return authenticated;
	}
	
	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}
	
	public Object getDetails() {
		return details;
	}
	
	public void setDetails(Object details) {
		this.details = details;
	}
	
	public void eraseCredentials() {
		eraseSecret(getCredentials());
		eraseSecret(getPrincipal());
		eraseSecret(details);
	}
	
	public void eraseSecret(Object secret) {
		if (secret instanceof CredentialsContainer) {
			((CredentialsContainer) secret).eraseCredentials();
		}
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (authenticated ? 1231 : 1237);
		result = prime * result + ((authorities == null) ? 0 : authorities.hashCode());
		result = prime * result + ((details == null) ? 0 : details.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AbstractAuthenticationToken other = (AbstractAuthenticationToken) obj;
		if (authenticated != other.authenticated)
			return false;
		if (authorities == null) {
			if (other.authorities != null)
				return false;
		} else if (!authorities.equals(other.authorities))
			return false;
		if (details == null) {
			if (other.details != null)
				return false;
		} else if (!details.equals(other.details))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "AbstractAuthenticationToken [authorities=" + authorities + ", details=" + details + ", authenticated="
				+ authenticated + "]";
	}
}
