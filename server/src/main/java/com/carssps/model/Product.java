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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "product")
@JsonIgnoreProperties(value = {"orderProducts", "catalogProducts"})
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
	
	@OneToMany(mappedBy = "product")
	private List<OrderDetails> orderProducts = new ArrayList<>();
	
	@OneToMany(mappedBy = "catalog")
	private List<CatalogProduct> catalogProducts = new ArrayList<>();

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

	public List<OrderDetails> getOrderProducts() {
		return orderProducts;
	}

	public void setOrderProducts(List<OrderDetails> orderProducts) {
		this.orderProducts = orderProducts;
	}

	public List<CatalogProduct> getCatalogProducts() {
		return catalogProducts;
	}

	public void setCatalogProducts(List<CatalogProduct> catalogProducts) {
		this.catalogProducts = catalogProducts;
	}
}
