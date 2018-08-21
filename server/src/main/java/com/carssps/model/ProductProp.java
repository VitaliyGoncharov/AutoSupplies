package com.carssps.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "p_prop")
public class ProductProp {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "prop_title_id")
	private ProductPropTitle propTitleId;
	
	private String value;
	
	@JsonBackReference
	@ManyToMany(mappedBy = "properties")
	private List<Product> products = new ArrayList<>();

	public ProductProp() {
	}
	
	public ProductProp(int id, ProductPropTitle propTitleId, String value, List<Product> products) {
		super();
		this.id = id;
		this.propTitleId = propTitleId;
		this.value = value;
		this.products = products;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public ProductPropTitle getPropTitleId() {
		return propTitleId;
	}

	public void setPropTitleId(ProductPropTitle propTitleId) {
		this.propTitleId = propTitleId;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	@Override
	public String toString() {
		return "GoodProps [id=" + id + ", propTitleId=" + propTitleId + ", value=" + value + "]";
	}
	
}
