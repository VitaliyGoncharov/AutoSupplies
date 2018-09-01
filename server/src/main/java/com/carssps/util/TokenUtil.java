package com.carssps.util;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

@Component
public class TokenUtil {
	public static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/.|%$@#*&^()-+=\\";
	public static final int TOKEN_LENGTH = 255;
	
	public static final SecureRandom random = new SecureRandom();
	public static final char[] symbols = CHARACTERS.toCharArray();
	public static final char[] buf = new char[TOKEN_LENGTH];
	
	public String generateToken() {
		for (int idx = 0; idx < buf.length; idx++)
			buf[idx] = symbols[random.nextInt(symbols.length)];
		return new String(buf);
	}
}
