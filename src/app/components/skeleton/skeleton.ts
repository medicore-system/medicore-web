/**
 * Componente Skeleton
 *
 * Actúa como pantalla de inicio de sesión (login) de la aplicación.
 * Contiene el formulario de correo y contraseña, valida los campos
 * y llama al AuthService para autenticar al usuario.
 * En caso de éxito redirige a `/main-page`; en caso de error muestra un mensaje.
 */
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

  /** Correo electrónico ingresado por el usuario en el formulario de login. */
  correo: string = '';

  /** Contraseña ingresada por el usuario en el formulario de login. */
  contrasena: string = '';

  /** Mensaje de error que se muestra cuando el login falla o los campos están vacíos. */
  mensajeError: string = '';

  /** Controla la visibilidad de los campos del formulario de login. */
  mostrarCampos: boolean = false;

  /** Controla la visibilidad del campo de correo. */
  mostrarCorreo: boolean = false;

  /** Controla la visibilidad del nombre/datos del usuario autenticado. */
  mostrarUsuario: boolean = false;

  /**
   * Valida los campos del formulario y el formato del correo,
   * luego invoca el login en el AuthService.
   * Redirige a `/main-page` si las credenciales son correctas.
   */
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

  /**
   * Navega a la pantalla de registro de nuevos usuarios.
   */
  irARegistro() {
    this.router.navigate(['/register']);
  }

}