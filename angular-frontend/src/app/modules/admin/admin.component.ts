import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  categorias: any[] = []; // categorías aquí
  nuevoProducto = { nombre: '', marca: '' , categoria_id: null};
  errorProducto = false;
  supermercados: any[] = [];
  nuevoSupermercado = { nombre: '' };
  errorSupermercado = false;
  supermercadoEditando: any = null;
  private supermercadoApiUrl = 'http://localhost:8000/supermercados';
  // NUEVO: para edición
  categoriaEditando: any = null;
productos: any[] = [];
productoEditando: any = null;
private productosApiUrl = 'http://localhost:8000/productos';
  // URL base de la API Symfony
  private apiUrl = 'http://localhost:8000/categorias';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarSupermercados(); 
    this.cargarProductos();
  }

  cargarCategorias() {
    this.http.get<any[]>(this.apiUrl + '/').subscribe({
      next: (data) => {
        this.categorias = data;
        this.errorProducto = false;
      },
      error: () => {
        this.errorProducto = true;
      },
    });
  }

  eliminarCategoria(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.cargarCategorias();
      },
      error: () => {
        alert('Error al eliminar la categoría');
      },
    });
  }

  // --- NUEVOS MÉTODOS PARA EDITAR ---

  abrirPopupEditar(categoria: any) {
    // Clonar el objeto para no mutar la lista directamente
    this.categoriaEditando = { ...categoria };
  }

  guardarEdicion() {
    if (!this.categoriaEditando.nombre.trim()) {
      alert('El nombre no puede estar vacío');
      return;
    }

    this.http.put(`${this.apiUrl}/${this.categoriaEditando.id}/edit`, { nombre: this.categoriaEditando.nombre })
      .subscribe({
        next: () => {
          // Actualizar la lista local sin recargar todo
          const index = this.categorias.findIndex(c => c.id === this.categoriaEditando.id);
          if (index > -1) {
            this.categorias[index].nombre = this.categoriaEditando.nombre;
          }
          this.categoriaEditando = null; // cerrar popup
        },
        error: (err) => {
          alert('Error al guardar la categoría');
          console.error(err);
        }
      });
  }

  cancelarEdicion() {
    this.categoriaEditando = null; // cerrar popup sin cambios
  }

  cargarSupermercados() {
  this.http.get<any[]>(this.supermercadoApiUrl + '/').subscribe({
    next: (data) => {
      this.supermercados = data;
      this.errorSupermercado = false;
    },
    error: () => {
      this.errorSupermercado = true;
    },
  });
}

agregarSupermercado() {
  if (!this.nuevoSupermercado.nombre.trim()) {
    this.errorSupermercado = true;
    return;
  }
  this.http.post(this.supermercadoApiUrl + '/new', this.nuevoSupermercado).subscribe({
    next: () => {
      this.nuevoSupermercado.nombre = '';
      this.errorSupermercado = false;
      this.cargarSupermercados();
    },
    error: () => {
      this.errorSupermercado = true;
    },
  });
}

eliminarSupermercado(id: number) {
  this.http.delete(`${this.supermercadoApiUrl}/${id}`).subscribe({
    next: () => this.cargarSupermercados(),
    error: () => alert('Error al eliminar el supermercado'),
  });
}

abrirPopupEditarSupermercado(supermercado: any) {
  this.supermercadoEditando = { ...supermercado };
}

guardarEdicionSupermercado() {
  if (!this.supermercadoEditando.nombre.trim()) {
    alert('El nombre no puede estar vacío');
    return;
  }

  this.http
    .put(`${this.supermercadoApiUrl}/${this.supermercadoEditando.id}/edit`, {
      nombre: this.supermercadoEditando.nombre,
    })
    .subscribe({
      next: () => {
        const index = this.supermercados.findIndex((s) => s.id === this.supermercadoEditando.id);
        if (index > -1) {
          this.supermercados[index].nombre = this.supermercadoEditando.nombre;
        }
        this.supermercadoEditando = null;
      },
      error: () => alert('Error al guardar el supermercado'),
    });
}

cancelarEdicionSupermercado() {
  this.supermercadoEditando = null;
}

cargarProductos() {
  this.http.get<any[]>(this.productosApiUrl + '/').subscribe({
    next: (data) => {
      this.productos = data;
      this.errorProducto = false;
    },
    error: () => {
      this.errorProducto = true;
    },
  });
}

agregarProducto() {
  const { nombre, marca } = this.nuevoProducto;
  if (!nombre.trim() || !marca.trim()) {
    this.errorProducto = true;
    return;
  }

  this.http.post(this.productosApiUrl + '/new', this.nuevoProducto).subscribe({
    next: () => {
      this.nuevoProducto = { nombre: '', marca: '', categoria_id: null };
      this.errorProducto = false;
      this.cargarProductos();
    },
    error: () => {
      this.errorProducto = true;
    },
  });
}

// En guardarEdicionProducto:
guardarEdicionProducto() {
  if (!this.productoEditando.nombre.trim() || !this.productoEditando.marca.trim()) {
    alert('Complete todos los campos correctamente');
    return;
  }

  this.http
    .put(`${this.productosApiUrl}/${this.productoEditando.id}/edit`, {
      nombre: this.productoEditando.nombre,
      marca: this.productoEditando.marca,
      categoria_id: this.productoEditando.categoria_id,
    })
    .subscribe({
      next: () => {
        const index = this.productos.findIndex(p => p.id === this.productoEditando.id);
        if (index > -1) {
          this.productos[index] = { ...this.productoEditando };
        }
        this.productoEditando = null;
      },
      error: () => alert('Error al guardar el producto'),
    });
}

eliminarProducto(id: number) {
  this.http.delete(`${this.productosApiUrl}/${id}`).subscribe({
    next: () => this.cargarProductos(),
    error: () => alert('Error al eliminar el producto'),
  });
}

abrirPopupEditarProducto(producto: any) {
  this.productoEditando = { ...producto };
}



cancelarEdicionProducto() {
  this.productoEditando = null;
}

getNombreCategoria(idCategoria: number): string {
  const categoria = this.categorias.find(cat => cat.id === idCategoria);
  return categoria ? categoria.nombre : 'Sin categoría';
}
}
