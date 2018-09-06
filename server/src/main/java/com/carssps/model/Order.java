package com.carssps.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

import com.carssps.controller.View;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;

@Entity
@Table(name = "orders")
public class Order {
	
	@JsonView(View.Public.class)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@JsonView(View.Public.class)
	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Customer customer;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "total")
	private int total;
	
	@JsonView(View.Public.class)
	@Column(name = "status")
	private short status;
	
	@Column(name = "updated_at")
	private Date updatedAt;
	
	@JsonView(View.Public.class)
	@Column(name = "created_at")
	private Date createdAt;
	
	@OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
	private List<OrderProduct> products = new ArrayList<>();

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Order(Customer customer, String address, short status, int total) {
		super();
		this.customer = customer;
		this.address = address;
		this.status = status;
		this.total = total;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public short getStatus() {
		return status;
	}

	public void setStatus(short status) {
		this.status = status;
	}

	public List<OrderProduct> getProducts() {
		return products;
	}

	public void setProducts(List<OrderProduct> products) {
		this.products = products;
	}
}
