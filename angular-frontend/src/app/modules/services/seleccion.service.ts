// seleccion.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {
  private idsSeleccionadosSubject = new BehaviorSubject<number[]>([]);
  idsSeleccionados$ = this.idsSeleccionadosSubject.asObservable();

  agregarId(id: number) {
    const ids = this.idsSeleccionadosSubject.getValue();
    if (!ids.includes(id)) {
      const nuevosIds = [...ids, id]; // 🔁 ¡nueva referencia!
      this.idsSeleccionadosSubject.next(nuevosIds); // 🔔 emite nuevo valor
    }
  }

  obtenerIds(): number[] {
    debugger;
    return this.idsSeleccionadosSubject.getValue();
  }
}
