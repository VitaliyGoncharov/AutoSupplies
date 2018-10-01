package com.carssps.service.impl;

import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringRunner;

import com.carssps.model.Catalog;
import com.carssps.service.CatalogService;

@RunWith(SpringRunner.class)
public class CatalogServiceTest extends Assert {
	
	@Mock
	CatalogServiceImpl catalogService; 
	
	@Test
	public void test_Method_Transform_List_To_Map() {
		when(catalogService.getTree(new HashMap<Integer, Catalog>())).thenReturn(new HashMap<Integer, Catalog>());
		assertEquals(new HashMap<Integer, Catalog>(), catalogService.mapToTree(new ArrayList<Catalog>()));
	}
}
