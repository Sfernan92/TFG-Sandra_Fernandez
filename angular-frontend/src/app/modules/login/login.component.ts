import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // asegúrate de que la ruta esté bien

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
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
  if (!this.email.trim() || !this.password.trim()) {
    this.errorMessage = 'Debe completar todos los campos.';
    return;
  }

  this.authService.login(this.email, this.password).subscribe({
    next: (response) => {
      console.log('Login exitoso:', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.router.navigate(['/admin']);
    },
    error: (error) => {
      console.error('Error de login:', error);
      this.errorMessage = 'Correo o contraseña incorrectos';
    }
    });
  }
 }