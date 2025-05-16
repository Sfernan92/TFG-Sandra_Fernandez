import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-landing',
  imports: [ CommonModule, NavbarComponent, FooterComponent ],
  templateUrl: './landing.component.html',
  //styleUrl: './landing.component.css'
})
export class LandingComponent {

}
