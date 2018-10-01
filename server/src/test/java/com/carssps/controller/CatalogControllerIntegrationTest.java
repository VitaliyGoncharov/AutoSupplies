package com.carssps.controller;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.carssps.model.Catalog;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = {CatalogController.class}, secure = false)
public class CatalogControllerIntegrationTest {

	@Autowired
	private MockMvc mvc;
	
	@MockBean
	private CatalogController catalogController;
	
	@Test
	public void getCatalogs() throws Exception {
		Catalog catalog = new Catalog();
		catalog.setId(2);
		catalog.setCatName("oil");
		Map<Integer, Catalog> catalogs = new HashMap<>();
		catalogs.put(catalog.getId(), catalog);
		given(catalogController.getCatalogs()).willReturn(ResponseEntity.ok(catalogs));
		
		mvc.perform(get("/api/catalogs"))
		.andExpect(status().isOk());
	}
}
