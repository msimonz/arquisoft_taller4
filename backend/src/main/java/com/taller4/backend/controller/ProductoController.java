package com.taller4.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.taller4.backend.model.Producto;
import com.taller4.backend.repository.ProductoRepository;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoRepository repo;

    public ProductoController(ProductoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Producto> listar() {
        return repo.findAll();
    }

    @PostMapping
    public Producto crear(@RequestBody Producto p) {
        return repo.save(p);
    }
}
