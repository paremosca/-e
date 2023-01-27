import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SvcPartituresService {

  constructor(private http: HttpClient) { }


  public getAll(): Observable<Object> {
    return this.http.get("https://localhost:7201/api/partituras/2");
  }

  public getPartiturasByTipoAndInstr(Tipo,Instr): Observable<Object> {
    return this.http.get(`https://localhost:7201/api/partituras/PartiturasByTipoAndInstr/${Tipo}/${Instr}`)
  }

  public DescargaBlob(NombreArchivo, Instr): Observable<Object>
  {
    return this.http.post(`https://localhost:7201/api/partituras/DescargarBlob/${NombreArchivo}/${Instr}`, "", { responseType: 'blob' });
  }

  public UploadBlob(formulario) {
    console.log("desde servicio");
    console.log(formulario.value.nombre);
    console.log(formulario.value.imagen_upload.target.files[0]);

    const formData = this.ConstruirFormData(formulario);
    console.log(formData);

    return this.http.post("https://localhost:7201/api/partituras/UploadBlob", formData);
  }

  private ConstruirFormData(formulario): FormData {
    const formData = new FormData();

    formData.append('nombre', formulario.value.nombre);
    formData.append('imagen_upload', formulario.value.imagen_upload.target.files[0]);
    formData.append('IdUsuario', '1');
    formData.append('IdTipoInstrumento', '8');

    console.log("dinsfuncio");
    console.log(formData);

    return formData;
  }

}
