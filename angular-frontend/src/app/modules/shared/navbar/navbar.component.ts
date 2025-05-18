import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from '../buscador/buscador.component'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, BuscadorComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
