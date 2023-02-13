import { Component, OnInit } from '@angular/core';
import { SvcPartituresService } from 'src/app/svc_Partitures/svc-partitures.service';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PartiturasService } from '../_services/partituras.service';
import { StorageService } from '../_services/storage.service';

export interface Partitura {
  ID: number;
  Nombre: string;
}

@Component({
  selector: 'app-partitures',
  templateUrl: './partitures.component.html',
  styleUrls: ['./partitures.component.css']
})
export class PartituresComponent implements OnInit {
  public json_Partitures;
  public contact;
  public fileUrl: any;
  constructor(private servicioStorage: StorageService, private router: Router, private servicioPartituras:PartiturasService) { }

 
  ngOnInit(): void {

    console.log("ha entrat")

    this.servicioPartituras.getPartituras(this.servicioStorage.getToken(),"2","1").subscribe({
      next: data => {
        console.log(data);
        this.contact = Object.keys(data).map(function(index){
                let partitura = data[index];
                return partitura
              })

      },
      error: err => {
        console.log(err);
      }
    });

    // this.json_Partitures = this.servicioPartitures.getPartiturasByTipoAndInstr('1','8')
    //   .subscribe(partitures => {
    //     console.log(partitures);

    //     this.contact = Object.keys(partitures).map(function(index){
    //       let partitura = partitures[index];
    //       return partitura
    //     })


    //     console.log(this.contact);
    //   }, error => {
    //     console.log(error)
    //   });

  }

  folders: Partitura[] = [
    {
      ID: 0,
      Nombre: '75 Aniversario Andaluces',
    },
    {
      ID: 1,
      Nombre: 'Agüero',
    },
    {
      ID: 2,
      Nombre: 'Aitana',
    },
    {
      ID: 3,
      Nombre: 'Alcaide i Músic',
    }
  ];

  // DescargarBlob(NombreArchivo) {
  //   console.log(NombreArchivo);

  //   this.servicioPartitures.DescargaBlob(NombreArchivo,8).subscribe(data => {
  //     console.log(data);
  //     saveAs(data, NombreArchivo)
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // downLoadFile(data: any, type: string) {
  //   let blob = new Blob([data], { type: type });
  //   let url = window.URL.createObjectURL(blob);
  //   let pwa = window.open(url);
  //   if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
  //     alert('Please disable your Pop-up blocker and try again.');
  //   }
  // }

  AddPartitura(Clave: any) {
    this.router.navigate(['/AddPartitures'])
  }

}
