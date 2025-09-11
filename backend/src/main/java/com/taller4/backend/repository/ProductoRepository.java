package com.taller4.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.taller4.backend.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
