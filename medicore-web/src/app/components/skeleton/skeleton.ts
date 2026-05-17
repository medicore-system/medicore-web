import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { FormsModule } from '@angular/forms';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [FormsModule, Header, Footer],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.css',
})
export class Skeleton {
  constructor(private router: Router) {}

  private authService = inject(AuthService);

  correo = '';
  contrasena = '';

  iniciarSesion() {

    this.authService.login(
      this.correo,
      this.contrasena
    ).subscribe({

      next: (response) => {
        console.log('Login correcto', response);
        this.router.navigate(['/main-page']);
      },

      error: (error) => {
        console.error('Error login', error);
      }

    });
  }

  irARegistro() {
  this.router.navigate(['/register']);
}
}
