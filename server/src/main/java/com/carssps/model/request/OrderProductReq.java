package com.carssps.model.request;

import java.util.Optional;

public class OrderProductReq {
	private int id;
	private int amount;
	
	public OrderProductReq() {
	}

	public int getId() {
		return id;
	}

	public void setProductId(int id) {
		this.id = id;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = Optional.ofNullable(amount).orElse(1);
	}

	@Override
	public String toString() {
		return "OrderProductReq [id=" + id + ", amount=" + amount + "]";
	}
}
