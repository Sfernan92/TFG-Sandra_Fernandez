import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SeleccionService {
  private idsSeleccionadosSubject = new BehaviorSubject<number[]>([]);
  idsSeleccionados$ = this.idsSeleccionadosSubject.asObservable();

  // Obtener el array actual para evitar sobreescribir sin querer
  private get idsSeleccionados(): number[] {
    return this.idsSeleccionadosSubject.getValue();
  }

  agregarId(id: number): void {
    if (!this.idsSeleccionados.includes(id)) {
      this.idsSeleccionadosSubject.next([...this.idsSeleccionados, id]);
    }
  }

  quitarId(id: number): void {
    const nuevosIds = this.idsSeleccionados.filter(i => i !== id);
    this.idsSeleccionadosSubject.next(nuevosIds);
  }
}
