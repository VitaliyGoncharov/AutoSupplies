package com.carssps.controller;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import com.carssps.model.Catalog;
import com.carssps.service.CatalogService;

@RunWith(MockitoJUnitRunner.class)
public class CatalogControllerUnitTest {
	
	@Mock
	CatalogService catalogService;

	@InjectMocks
	CatalogController catalogController;
	
	@Test
	public void testGetCatalogs() {
		List<Catalog> catalogsList = new ArrayList<>();
		Map<Integer, Catalog> catalogsMap = new HashMap<>();
		
		when(catalogService.findAll()).thenReturn(catalogsList);
		when(catalogService.mapToTree(catalogsList)).thenReturn(catalogsMap);
		
		assertEquals(ResponseEntity.ok(new HashMap<Integer, Catalog>()), catalogController.getCatalogs());
	}
	
	
}
