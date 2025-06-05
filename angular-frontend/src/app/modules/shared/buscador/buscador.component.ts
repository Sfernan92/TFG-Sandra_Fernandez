import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SeleccionService } from '../../services/seleccion.service';
@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './buscador.component.html',
})
export class BuscadorComponent {
  terminoBusqueda: string = '';
  alimentos: { id: number, nombre	: string }[] = [];

  constructor(private http: HttpClient,private seleccionService: SeleccionService) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/productos/').subscribe((data) => {
      this.alimentos = data.map(item => ({
        nombre	: item.nombre	 || 'Sin nombre',
        id: item.id,
      }));
    });
  }

  obtenerAlimentosFiltrados() {
    const termino = this.terminoBusqueda.toLowerCase();
    return this.alimentos.filter(alimento =>
      alimento.nombre	.toLowerCase().includes(termino)
    );
  }

  seleccionarAlimento(id: number) {
    this.seleccionService.agregarId(id);
    this.terminoBusqueda = ''; // Limpiar el campo de búsqueda después de seleccionar
  }
}
