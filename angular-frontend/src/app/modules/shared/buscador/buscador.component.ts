import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.component.html',
})
export class BuscadorComponent {
  terminoBusqueda: string = '';

  alimentos = [

    { nombre: 'Manzana', emoji: '🍎' },
    { nombre: 'Banana', emoji: '🍌' },
    { nombre: 'Pizza', emoji: '🍕' },
    { nombre: 'Hamburguesa', emoji: '🍔' },
    { nombre: 'Ensalada', emoji: '🥗' },
    { nombre: 'Helado', emoji: '🍨' },
    { nombre: 'Pan', emoji: '🍞' },
    { nombre: 'Taco', emoji: '🌮' },
    { nombre: 'Sushi', emoji: '🍣' },
    { nombre: 'Galleta', emoji: '🍪' },
    { nombre: 'Pastel', emoji: '🎂' },
    { nombre: 'Uva', emoji: '🍇' },
    { nombre: 'Fresa', emoji: '🍓' },
    { nombre: 'Piña', emoji: '🍍' },
    { nombre: 'Sandía', emoji: '🍉' },
    { nombre: 'Cereza', emoji: '🍒' },
    { nombre: 'Mantequilla', emoji: '🧈' },
    { nombre: 'Huevo', emoji: '🥚' },
    { nombre: 'Queso', emoji: '🧀' },
    { nombre: 'Yogur', emoji: '🍦' },
    { nombre: 'Cereal', emoji: '🥣' },
    { nombre: 'Aceite', emoji: '🧴' },
    { nombre: 'Azúcar', emoji: '🍬' },
    { nombre: 'Sal', emoji: '🧂' },
    { nombre: 'Pasta', emoji: '🍝' },
    { nombre: 'Arroz', emoji: '🍚' },
    { nombre: 'Pizza', emoji: '🍕' },
    { nombre: 'Maíz', emoji: '🌽' },
    { nombre: 'Patata', emoji: '🥔' },
    { nombre: 'Zanahoria', emoji: '🥕' },
    { nombre: 'Brócoli', emoji: '🥦' },
    { nombre: 'Espinaca', emoji: '🥬' },
    { nombre: 'Champiñón', emoji: '🍄' },
    { nombre: 'Cebolla', emoji: '🧅' },
    { nombre: 'Ajo', emoji: '🧄' },
    { nombre: 'Pimiento', emoji: '🌶️' },
    { nombre: 'Pistachos', emoji: '🥜' },
    { nombre: 'Chocolate', emoji: '🍫' },
  ];

  obtenerAlimentosFiltrados() {
    const termino = this.terminoBusqueda.toLowerCase();
    return this.alimentos.filter(alimento =>
      alimento.nombre.toLowerCase().includes(termino)
    );
  }
}
