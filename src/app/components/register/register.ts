/**
 * Componente Register
 *
 * Formulario de registro de nuevos pacientes.
 * Carga dinámicamente los catálogos de ciudades y EPS desde el backend
 * para rellenar los selectores del formulario.
 */
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  private router = inject(Router);
  private authService = inject(AuthService);

  // FORM DATA
  documento = '';
  nombre = '';
  apellido = '';
  correo = '';
  contrasena = '';
  telefono = '';
  /** Código de la ciudad seleccionada por el usuario. */
  codigoCiudad: string | null = null;
  /** Código de la EPS seleccionada por el usuario. */
  codigoEPS: string | null = null;

  /** Lista de ciudades disponibles obtenida desde el backend. */
  ciudades: any[] = [];
  /** Lista de EPS disponibles obtenida desde el backend. */
  epsList: any[] = [];

  /**
   * Ciclo de vida: carga ciudades y EPS al montar el componente
   * para popullar los selectores del formulario.
   */
  ngOnInit() {
    this.cargarCiudades();
    this.cargarEps();
  }

  /**
   * Obtiene el catálogo de ciudades desde el endpoint `cities` y lo asigna a `ciudades`.
   */
  cargarCiudades() {
    this.authService.get<any[]>('cities').subscribe({
      next: (res) => {
        this.ciudades = res;
      },
      error: err => console.error('Error ciudades', err)
    });
  }

  /**
   * Obtiene el catálogo de EPS desde el endpoint `Eps` y lo asigna a `epsList`.
   */
  cargarEps() {
    this.authService.get<any[]>('Eps').subscribe({
      next: (res) => {
        console.log('EPS API:', res);
        this.epsList = res;
      },
      error: err => console.error('Error eps', err)
    });
  }

  /**
   * Valida que ciudad y EPS estén seleccionadas, construye el body del registro
   * y llama al endpoint de registro. Si tiene éxito, redirige al skeleton (login).
   */
  registrarse() {
    if (!this.codigoCiudad || !this.codigoEPS) {
      alert("Debes seleccionar ciudad y EPS");
      return;
    }

    const body = {
      documento: this.documento,
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      contrasena: this.contrasena,
      telefono: this.telefono,
      codigoCiudad: this.codigoCiudad,
      codigoEPS: this.codigoEPS
    };

    this.authService.register(body).subscribe({
      next: (response) => {
        this.router.navigate(['/skeleton']);
      },
      error: (error) => {
        console.error('Error Register', error);
      }
    });
  }
}