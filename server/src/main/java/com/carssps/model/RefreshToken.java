package com.carssps.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.ManyToOne;

@Entity
@Table(name = "refresh_token")
public class RefreshToken {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	private String token;
	
	private int exp;
	
	private String device;

	RefreshToken() {
	}
	
	public RefreshToken(int id, int exp) {
		this.id = id;
		this.exp = exp;
	}
	
	public RefreshToken(User user, String token, int exp, String device) {
		this.user = user;
		this.token = token;
		this.exp = exp;
		this.device = device;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public int getExp() {
		return exp;
	}

	public void setExp(int exp) {
		this.exp = exp;
	}

	public String getDevice() {
		return device;
	}

	public void setDevice(String device) {
		this.device = device;
	}

	@Override
	public String toString() {
		return "RefreshToken [id=" + id + ", user=" + user + ", token=" + token + ", exp=" + exp + ", device=" + device
				+ "]";
	}
}
