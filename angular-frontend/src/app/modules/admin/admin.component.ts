import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.component.html',
})

export class AdminComponent {
  // --- Productos ---
  products = [
    { id: 1, nombre: 'Arroz', precio: 1.2 },
    { id: 2, nombre: 'Pan', precio: 0.9 },
    { id: 3, nombre: 'Leche', precio: 1.5 }
  ];
  nuevoProducto = { nombre: '', precio: 0 };
  errorProducto: boolean = false;
  agregarProducto() {
    if (!this.nuevoProducto.nombre.trim() || this.nuevoProducto.precio <= 0) {
      this.errorProducto = true;
      return;
    }
    const id = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    this.products.push({ id, ...this.nuevoProducto });
    this.nuevoProducto = { nombre: '', precio: 0 };
    this.errorProducto = false;
  }
  eliminarProducto(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }
  // --- Supermercados ---
  supermercados = [
    { id: 1, nombre: 'Supermercado 1' },
    { id: 2, nombre: 'Supermercado 2' },
    { id: 3, nombre: 'Supermercado 3' }
  ];
  nuevoSupermercado = { nombre: '' };
  errorSupermercado: boolean = false;
  agregarSupermercado() {
    if (!this.nuevoSupermercado.nombre.trim()) {
      this.errorSupermercado = true;
      return;
    }
    const id = this.supermercados.length ? Math.max(...this.supermercados.map(s => s.id)) + 1 : 1;
    this.supermercados.push({ id, ...this.nuevoSupermercado });
    this.nuevoSupermercado = { nombre: '' };
    this.errorSupermercado = false;
  }
  eliminarSupermercado(id: number) {
    this.supermercados = this.supermercados.filter(s => s.id !== id);
  }
}