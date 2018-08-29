package com.carssps.model.request;

import java.util.Optional;

public class OrderProductReq {
	private int amount;
	private int orderId;
	private int productId;
	
	public OrderProductReq() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = Optional.ofNullable(amount).orElse(1);
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = Optional.ofNullable(orderId).orElse(null);
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = Optional.ofNullable(productId).orElse(null);
	}

	@Override
	public String toString() {
		return "UpdateOrderProductRequest [amount=" + amount + ", orderId=" + orderId + ", productId=" + productId
				+ "]";
	}
}
