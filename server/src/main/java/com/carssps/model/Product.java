package com.carssps.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.carssps.controller.View;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "product")
@Json
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "image")
	private String image;
	
	@Column(name = "price")
	private int price;
	
	@Column(name = "description")
	private String description;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name = "products_props",
			joinColumns = @JoinColumn(
					name = "product_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(
					name = "property_id", referencedColumnName = "id")
			)
	private List<ProductProp> properties = new ArrayList<>();
	
	@JsonBackReference
	@OneToMany(mappedBy = "product")
	private List<OrderProduct> orders = new ArrayList<>();
	
	@JsonBackReference("")
	@ManyToMany(mappedBy = "products")
	private List<Catalog> catalogs = new ArrayList<>();

	public Product() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<ProductProp> getProperties() {
		return properties;
	}

	public void setProperties(List<ProductProp> properties) {
		this.properties = properties;
	}

	public List<OrderProduct> getOrders() {
		return orders;
	}

	public void setOrders(List<OrderProduct> orders) {
		this.orders = orders;
	}

	public List<Catalog> getCatalogs() {
		return catalogs;
	}

	public void setCatalogs(List<Catalog> catalogs) {
		this.catalogs = catalogs;
	}
}
