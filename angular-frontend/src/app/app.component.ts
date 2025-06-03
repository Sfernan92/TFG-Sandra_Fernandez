import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './modules/toast/toast.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, HttpClientModule],
  templateUrl: './app.component.html',
  //styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-frontend';
  showToast = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showToast = this.router.url === '/'; // Solo en ruta raíz
    });
  }
}
