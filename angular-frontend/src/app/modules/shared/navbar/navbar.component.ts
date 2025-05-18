import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from '../buscador/buscador.component'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, BuscadorComponent, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
