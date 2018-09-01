package com.carssps.model.response;

import java.util.Optional;

public class TokenRequest {
	
	private String grant_type;
	private String email;
	private String password;
	private String refresh_token;
	
	public TokenRequest() {
	}

	public String getGrant_type() {
		return grant_type;
	}

	public void setGrant_type(String grant_type) {
		this.grant_type = grant_type;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRefresh_token() {
		return refresh_token;
	}

	public void setRefresh_token(String refresh_token) {
		this.refresh_token = Optional.of(refresh_token).orElse(null);
	}
}
