import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skeleton',
  imports: [],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.css',
})
export class Skeleton {
    constructor(private router: Router) {}

  iniciarSesion() {
    this.router.navigate(['/main-page']);
  }

  irRegistro() {
    this.router.navigate(['/register']);
  }
}
