package com.carssps.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/{path1:[^\\.]+}").setViewName("forward:/index.html");
		registry.addViewController("/{path1:[^\\.]+}/{path2:[^\\.]+}").setViewName("forward:/index.html");
		registry.addViewController("/{path1:[^\\.]+}/{path2:[^\\.]+}/{path3:[^\\.]+}").setViewName("forward:/index.html");
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		registry.addResourceHandler("/*.*").addResourceLocations("classpath:/static/");
//		registry.addResourceHandler("/photos/**").addResourceLocations("classpath:/public/photos/");
//		registry.addResourceHandler("/assets/**").addResourceLocations("classpath:/static/assets/");
	}
}
