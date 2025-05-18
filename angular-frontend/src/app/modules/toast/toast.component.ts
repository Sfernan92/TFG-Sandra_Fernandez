import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [ CommonModule ],
  templateUrl: './toast.component.html',
  //styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit {
  @Input() message = '¡Bienvenido!';
  @Input() subMessage = 'Nos alegra tenerte con nosotros.';
  @Input() delay = 2000; // ms hasta mostrar
  @Input() duration = 5000; // ms visible
  
  isVisible = false;
  isFadingIn = false;
  isFadingOut = false;
  
  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
      setTimeout(() => {
        this.isFadingIn = true;
        
        setTimeout(() => {
          this.isFadingOut = true;
          this.isFadingIn = false;
          
          setTimeout(() => {
            this.isVisible = false;
          }, 500); // tiempo del fade-out
        }, this.duration);
      }, 10); // aplicar fade-in
    }, this.delay);
  }
} 


