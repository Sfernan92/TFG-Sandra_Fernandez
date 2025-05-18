import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  
  constructor(private router: Router) {}
  
  login() {
    if (this.email === 'admin@admin.com' && this.password === 'admin123') {
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Correo o contraseña incorrectos';
    }
  }
}