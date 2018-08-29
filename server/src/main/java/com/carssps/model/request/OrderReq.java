package com.carssps.model.request;

import java.util.Optional;

public class OrderReq {
	private String name;
	private String address;
	private String phone;
	private String surname;
	private OrderProductReq[] products;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = Optional.ofNullable(name).orElse(null);
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = Optional.ofNullable(address).orElse(null);
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = Optional.ofNullable(phone).orElse(null);
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = Optional.ofNullable(surname).orElse(null);
	}
	public OrderProductReq[] getProducts() {
		return products;
	}
	public void setProducts(OrderProductReq[] products) {
		this.products = products;
	}
	
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("OrderRequest [name=" + name + ", address=" + address + ", phone=" + phone + ", surname=" + surname
				+ "]");
		for (OrderProductReq orderProduct: this.products) {
			sb.append("\n"+orderProduct.toString());
		}
		return sb.toString();
	}
}