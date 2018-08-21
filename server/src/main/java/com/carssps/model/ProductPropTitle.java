package com.carssps.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "p_prop_title")
public class ProductPropTitle {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(nullable = false, unique = true)
	private String name;
	
	@JsonBackReference
	@OneToMany(mappedBy = "propTitleId", fetch = FetchType.LAZY)
	private List<ProductProp> productProps = new ArrayList<>();

	public ProductPropTitle() {
	}

	public ProductPropTitle(int id, String name, List<ProductProp> productProps) {
		super();
		this.id = id;
		this.name = name;
		this.productProps = productProps;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<ProductProp> getProductProps() {
		return productProps;
	}

	public void setProductProps(List<ProductProp> productProps) {
		this.productProps = productProps;
	}

	@Override
	public String toString() {
		return "GoodPropsTitles [id=" + id + ", name=" + name + "]";
	}
}
