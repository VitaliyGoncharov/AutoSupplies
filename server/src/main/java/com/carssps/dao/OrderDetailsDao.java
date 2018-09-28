package com.carssps.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.carssps.model.OrderDetails;

@Repository
public interface OrderDetailsDao extends JpaRepository<OrderDetails, Integer> {
	
	@Modifying
	@Query("UPDATE OrderDetails SET amount = :amount where order_id = :orderId AND product_id = :productId")
	int updateAmountById(@Param("amount") int amount, @Param("orderId") int orderId, @Param("productId") int productId);
	
	@Modifying
	@Query("DELETE FROM OrderDetails WHERE order_id = :orderId AND product_id = :productId")
	int deleteByOrderIdAndProductId(@Param("orderId") int orderId, @Param("productId") int productId);
}
