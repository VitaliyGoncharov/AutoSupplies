package com.carssps.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.carssps.model.OrderProduct;

@Repository
public interface OrderProductDao extends JpaRepository<OrderProduct, Integer> {
	
	@Modifying
	@Query("UPDATE OrderProduct SET amount = :amount where order_id = :orderId AND product_id = :productId")
	int updateAmountById(@Param("amount") int amount, @Param("orderId") int orderId, @Param("productId") int productId);
	
	@Modifying
	@Query("DELETE FROM OrderProduct WHERE order_id = :orderId AND product_id = :productId")
	int deleteByOrderIdAndProductId(@Param("orderId") int orderId, @Param("productId") int productId);
}
