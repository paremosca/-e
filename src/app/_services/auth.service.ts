import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:7201/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set("APISIM","1234")
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createAuthorizationHeader(headers: Headers) {
  }

  login(Usuario: string, Contrasenya: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'IniciarSesion',
      {
        Usuario,
        Contrasenya,
      },
      httpOptions
    );
  }

  refreshToken(token: string) {

    httpOptions.headers.set('refreshToken',token);

    return this.http.get(AUTH_API + 'RecargaToken', httpOptions);
  }

  verificarToken(token: string)
  {

    const httpOptions1 = {
      headers: new HttpHeaders({'Content-Type': 'application/json','APISIM':'1234','idtoken':token})
    };


    //httpOptions.headers.set('idtoken',token);

    return this.http.get(AUTH_API+'verificaToken', httpOptions1);
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}