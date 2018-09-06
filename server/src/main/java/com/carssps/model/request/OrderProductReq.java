package com.carssps.model.request;

import java.util.Optional;

public class OrderProductReq {
	private int productId;
	private int amount;
	
	public OrderProductReq() {
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = Optional.ofNullable(amount).orElse(1);
	}

	@Override
	public String toString() {
		return "OrderProductReq [productId=" + productId + ", amount=" + amount + "]";
	}
}
