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
  codigoCiudad: string | null = null;
  codigoEps: string | null = null;

  ciudades: any[] = [];
  epsList: any[] = [];

  ngOnInit() {
    this.cargarCiudades();
    this.cargarEps();
  }

  cargarCiudades() {
    this.authService.get<any[]>('cities').subscribe({
      next: (res) => this.ciudades = res,
      error: err => console.error('Error ciudades', err)
    });
  }

  cargarEps() {
    this.authService.get<any[]>('eps').subscribe({
      next: (res) => this.epsList = res,
      error: err => console.error('Error eps', err)
    });
  }

  registrarse() {


    console.log('CIUDAD:', this.codigoCiudad);
    console.log('EPS:', this.codigoEps);
    if (!this.codigoCiudad || !this.codigoEps) {
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
      codigoEps: this.codigoEps
    };
    console.log(JSON.stringify(body));

    this.authService.register(body).subscribe({
      next: (response) => {
        console.log('Register correcto', response);
        this.router.navigate(['/skeleton']);
      },
      error: (error) => {
        console.error('Error Register', error);
      }
    });
  }
}