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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "catalog")
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
	
	@JsonBackReference
	@OneToMany(mappedBy = "catalog")
	private List<CatalogProduct> catalogProducts = new ArrayList<>();
	
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

	public List<CatalogProduct> getCatalogProducts() {
		return catalogProducts;
	}

	public void setCatalogProducts(List<CatalogProduct> catalogProducts) {
		this.catalogProducts = catalogProducts;
	}

	public Map<Integer, Catalog> getChilds() {
		return childs;
	}

	public void setChilds(Map<Integer, Catalog> childs) {
		this.childs = childs;
	}
}
