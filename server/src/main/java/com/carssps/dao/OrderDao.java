package com.carssps.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.carssps.model.Order;

@Repository
public interface OrderDao extends JpaRepository<Order, Integer> {
	
	// @Param("orderId") bounds to :orderId
	// clearAutomatically will ensure that EntityManager is automatically cleared when the query has executed
	@Modifying(clearAutomatically = true)
	@Query("UPDATE Order o SET o.address = :address WHERE o.id = :orderId")
	int updateAddress(@Param("address") String address, @Param("orderId") int id);
	
	@Modifying(clearAutomatically = true)
	@Query("UPDATE Order o SET o.status = :status WHERE o.id = :orderId")
	int updateStatus(@Param("status") short status, @Param("orderId") int id);
	
	@Modifying(clearAutomatically = true)
	@Query("UPDATE Order o SET o.address = :address, o.status = :status WHERE o.id = :orderId")
	int updateAddressAndStatus(@Param("address") String address, @Param("status") short status, @Param("orderId") int id);
	
	@Modifying(clearAutomatically = true)
	@Query("UPDATE Order o SET o.total = :total WHERE o.id = :orderId")
	int updateTotal(@Param("total") int total, @Param("orderId") int id);
}
