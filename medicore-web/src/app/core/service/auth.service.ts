import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

    login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(
        `${this.apiUrl}/auth/login`,
        { correo, contrasena }
    );
    }

  register(body: any) {
    return this.http.post(
      `${this.apiUrl}/auth/register`,
      body
    );
  }

    getCiudades() {
    return this.http.get<any[]>(`${this.apiUrl}/cities`);
    }

    getEps() {
    return this.http.get<any[]>(`${this.apiUrl}/eps`);
    }

}