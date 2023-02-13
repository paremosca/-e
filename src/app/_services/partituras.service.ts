import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:7201/api/partituras/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set("APISIM","1234")
};

@Injectable({
  providedIn: 'root'
})
export class PartiturasService {

  constructor(private http: HttpClient) { }

  getPartituras(token: string, tipoPartitura: string, tipoInstrumento: string):Observable<any>
  {

    const httpOptions1 = {
      headers: new HttpHeaders({'Content-Type': 'application/json','APISIM':'1234','TokenAuth':token})
    };


    //httpOptions.headers.set('idtoken',token);
    console.log(AUTH_API + 'getPartituras/'+tipoPartitura + '/' + tipoInstrumento);

    return this.http.get(AUTH_API + 'getPartituras/'+tipoPartitura + '/' + tipoInstrumento, httpOptions1);
  }

}
