import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../core/service/auth.service';

import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [
    FormsModule,
    Header,
    Footer,
    CommonModule
  ],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.css',
})

export class Skeleton {

  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);  // ← AGREGA ESTO

  correo: string = '';
  contrasena: string = '';
  mensajeError: string = '';
  mostrarCampos: boolean = false;
  mostrarCorreo: boolean = false;
  mostrarUsuario: boolean = false;

  iniciarSesion() {

    this.mensajeError = '';

    if (this.correo.trim() === '' || this.contrasena.trim() === '') {
      this.mensajeError = 'Debes completar todos los campos';
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(this.correo)) {
      this.mensajeError = 'Ingresa un correo válido';
      return;
    }

    this.authService.login(this.correo, this.contrasena).subscribe({

      next: (response) => {
        this.router.navigate(['/main-page']);
      },

      error: (error) => {
        this.mensajeError = 'Usuario no encontrado. Regístrate o verifica la información ingresada';
        this.cdr.detectChanges();  // ← AGREGA ESTO
      }

    });
  }

  irARegistro() {
    this.router.navigate(['/register']);
  }

}