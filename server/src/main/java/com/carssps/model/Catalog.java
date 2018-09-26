package com.carssps.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "catalog")
@JsonIdentityInfo(
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "id")
public class Catalog {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "parent_id")
	private int parentId;
	
	@Column(name = "cat_name")
	private String catName;
	
	@Column(name = "path_name")
	private String pathName;
	
	@OneToMany(mappedBy = "product")
	private List<CatalogProduct> products = new ArrayList<>();
	
	@Transient
	private Map<Integer, Catalog> childs;

	public Catalog() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	public String getPathName() {
		return pathName;
	}

	public void setPathName(String pathName) {
		this.pathName = pathName;
	}

	public List<CatalogProduct> getProducts() {
		return products;
	}

	public void setProducts(List<CatalogProduct> products) {
		this.products = products;
	}

	public Map<Integer, Catalog> getChilds() {
		return childs;
	}

	public void setChilds(Map<Integer, Catalog> childs) {
		this.childs = childs;
	}
}
