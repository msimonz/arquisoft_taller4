package com.taller4.backend.controller;

import org.springframework.http.ResponseEntity;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable("id") Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable("id") Long id, @RequestBody Producto datos) {
        return repo.findById(id)
            .map(p -> {
                p.setNombre(datos.getNombre());
                p.setPrecio(datos.getPrecio());
                p.setCantidad(datos.getCantidad());
                Producto actualizado = repo.save(p);
                return ResponseEntity.ok(actualizado); // 200 con el producto actualizado
            })
            .orElseGet(() -> ResponseEntity.notFound().build()); // 404 si no existe
    }



}

