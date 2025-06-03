import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ToastComponent } from '../toast/toast.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, ToastComponent],
  templateUrl: './landing.component.html',
  // styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  precios: any[] = [];
  categorias: string[] = [];
  supermercados: string[] = [];
  productos: string[] = [];

  tabla: {
    [producto: string]: {
      [supermercado: string]: number;
    };
  } = {};

  productosPorCategoria: {
    [categoria: string]: {
      [producto: string]: {
        [supermercado: string]: number;
      };
    };
  } = {};

  sumaPorCategoria: {
    [categoria: string]: {
      [supermercado: string]: number;
    };
  } = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/precios/').subscribe((data) => {
      this.precios = data;
      this.organizarDatos();
    });
  }

  organizarDatos() {
  this.categorias = [];
  this.supermercados = [];
  this.productos = [];
  this.tabla = {};
  this.productosPorCategoria = {};
  this.sumaPorCategoria = {};

  for (const item of this.precios) {
    const categoria = item.categoria || item.categoria_nombre || item.categoria;
    const producto = item.producto_nombre;
    const supermercado = item.supermercado_nombre;
    const precio = item.precio;

    if (!this.categorias.includes(categoria)) this.categorias.push(categoria);
    if (!this.supermercados.includes(supermercado)) this.supermercados.push(supermercado);

    // Tabla producto-supermercado
    if (!this.tabla[producto]) {
      this.tabla[producto] = {};
      this.productos.push(producto);
    }
    this.tabla[producto][supermercado] = precio;

    // Productos por categoria
    if (!this.productosPorCategoria[categoria]) this.productosPorCategoria[categoria] = {};
    if (!this.productosPorCategoria[categoria][producto]) this.productosPorCategoria[categoria][producto] = {};
    this.productosPorCategoria[categoria][producto][supermercado] = precio;
  }

  console.log('Categorias:', this.categorias);
  console.log('Supermercados:', this.supermercados);

  // Sumamos los precios por categoria y supermercado
  for (const cat of this.categorias) {
    this.sumaPorCategoria[cat] = {};
    for (const sup of this.supermercados) {
      let suma = 0;
      for (const prod in this.productosPorCategoria[cat]) {
        if (this.productosPorCategoria[cat][prod][sup]) suma += this.productosPorCategoria[cat][prod][sup];
      }
      this.sumaPorCategoria[cat][sup] = suma;
    }
  }
  console.log('Suma por categoria:', this.sumaPorCategoria);
}
}
