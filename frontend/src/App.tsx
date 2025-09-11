import { useEffect, useState } from "react";
import "./App.css";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export default function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nuevo, setNuevo] = useState({ nombre: "", precio: 0, cantidad: 0 });
  const [editando, setEditando] = useState<Producto | null>(null);

  // cargar productos
  useEffect(() => {
    fetch("http://localhost:8080/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  // crear producto
  const crearProducto = async () => {
    const res = await fetch("http://localhost:8080/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });
    const data = await res.json();
    setProductos([...productos, data]);
    setNuevo({ nombre: "", precio: 0, cantidad: 0 });
  };

  // eliminar producto
  const eliminarProducto = async (id: number) => {
    await fetch(`http://localhost:8080/productos/${id}`, { method: "DELETE" });
    setProductos(productos.filter((p) => p.id !== id));
  };

  // iniciar edición
  const iniciarEdicion = (producto: Producto) => {
    setEditando(producto);
  };

  // actualizar producto
  const actualizarProducto = async () => {
    if (!editando) return;
    const res = await fetch(
      `http://localhost:8080/productos/${editando.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editando),
      }
    );
    const data = await res.json();
    setProductos(
      productos.map((p) => (p.id === editando.id ? data : p))
    );
    setEditando(null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📦 Lista de Productos</h1>

      <div className="contenedor">
        {/* Columna izquierda → tabla */}
        <div className="columna tabla">
          <table border={1} cellPadding={8}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{p.cantidad}</td>
                  <td>
                    <button onClick={() => iniciarEdicion(p)}>Editar</button>
                    <button onClick={() => eliminarProducto(p.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Columna derecha → formularios */}
        <div className="columna formularios">
          <div className="formulario">
            <h2>➕ Agregar Producto</h2>
            <input
              placeholder="Nombre"
              value={nuevo.nombre}
              onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            />
            <input
              type="number"
              placeholder="Precio"
              value={nuevo.precio}
              onChange={(e) =>
                setNuevo({ ...nuevo, precio: parseFloat(e.target.value) })
              }
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={nuevo.cantidad}
              onChange={(e) =>
                setNuevo({ ...nuevo, cantidad: parseInt(e.target.value) })
              }
            />
            <button onClick={crearProducto}>Guardar</button>
          </div>

          {editando && (
            <div className="formulario">
              <h2>✏️ Editar Producto</h2>
              <input
                placeholder="Nombre"
                value={editando.nombre}
                onChange={(e) =>
                  setEditando({ ...editando, nombre: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Precio"
                value={editando.precio}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    precio: parseFloat(e.target.value),
                  })
                }
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={editando.cantidad}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    cantidad: parseInt(e.target.value),
                  })
                }
              />
              <button onClick={actualizarProducto}>Actualizar</button>
              <button onClick={() => setEditando(null)}>Cancelar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}