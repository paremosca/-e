import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { firstValueFrom, map, Observable, Subscription } from 'rxjs';
import { DocsPartitura } from '../models/DocsPartitura.model';
import { PartituraModel } from '../models/partitura.model';
import { TipoInstrumento } from '../models/tipoinstrumento.model';
import { PartiturasService } from '../_services/partituras.service';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import { DocPartitura } from '../models/DocPartitura.model';
import { TipoPartitura } from '../models/TipoPartitura.model';
import Swal from 'sweetalert2';
import { AuthService } from '../_services/auth.service';
import { stringify } from 'querystring';
import { resourceUsage } from 'process';

@Component({
  selector: 'app-list-partituras',
  templateUrl: './list-partituras.component.html',
  styleUrls: ['./list-partituras.component.css'],
})
export class ListPartiturasComponent implements OnInit {
  @Input() IdTipoPartitura: number;
  @Input() ClaveInstrument: number;
  @Input() ClavePaper: number;


  listPartitures$: Observable<DocsPartitura[]>;
  TipoInstrumentos: Observable<TipoInstrumento[]>;
  TipoPaperPartitura: PartituraModel[];
  TipoPartitura: Observable<TipoPartitura[]>;
  term!: string;

  listPartitures_aux: DocsPartitura[];
  TipoInstrumento: number = 8;
  TipoPaper: number = 1;
  EsArxiver: boolean;
  EsAdmin: boolean;

  result_aux: Array<DocsPartitura> = [];

  constructor(private servicioPartituras: PartiturasService, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.EsArxiver = false;
    this.EsAdmin = false;


    if (this.authService.getUID()){
      await this.authService.getEsArxiver(this.authService.getUID()).then(resp=>{
        this.EsArxiver = resp;
      })

      await this.authService.getEsAdmin(this.authService.getUID()).then(resp=>{
        this.EsAdmin = resp;
      })
    }

    this.servicioPartituras.getTipoInstrumentos_Angular().then(
      (Response) => {
        this.TipoInstrumentos = Response;
      },
      (err) => {
        console.log(err);
      }
    );

    this.servicioPartituras.getTipoPaperPartitura_Angular().subscribe({
      next: (v) => (this.TipoPaperPartitura = v),
      error: (e) => console.error(e),
    });

    this.TipoInstrumento = this.ClaveInstrument;
    this.TipoPaper = this.ClavePaper;

    this.servicioPartituras
      .getTipoPartituras_Angular()
      .then((Response) => {
        this.TipoPartitura = Response;
      })
      .catch((err) => {
        console.log(err);
      });

      this.loadPartitures()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPartitures();
  }

  changeTipoInstrumento() {
    this.loadPartitures();
  }

  changeTipoPaper() {
    this.loadPartitures();
  }

  loadPartitures() {
    this.servicioPartituras
      .getPartituras_Angular(
        this.IdTipoPartitura,
        this.TipoInstrumento,
        this.TipoPaper
      )
      .then(
        async (Response) => {
          this.listPartitures$ = Response;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  // async AddProperty(){
  //   this.servicioPartituras.setPropertyPartituras()
  // }

  async DescargatTodo() {

    const jszip = new JSZip();

    let megaprueba = this.listPartitures$ as unknown as DocsPartitura[];

    for (const doc1 of megaprueba) {
      if (doc1?.RutaArchivo) {
        await this.servicioPartituras
          .getUrlPartitura_Angular(doc1.RutaArchivo)
          .then((url_aux) => {
            const fileBlob = fetch(url_aux).then((response) => response.blob());
            jszip.file(doc1.Nombre + '.pdf', fileBlob);
          });
      }
    }

    let prueba1 = this.TipoInstrumentos as unknown as TipoInstrumento[];
    let selectedInstr = prueba1.find(
      (x) => Number(x.Clave) === this.TipoInstrumento
    );

    let prueba2 = this.TipoPaperPartitura as unknown as PartituraModel[];
    let selectedPaper = prueba2.find((x) => Number(x.Clave) === this.TipoPaper);

    let prueba3 = this.TipoPartitura as unknown as TipoPartitura[];
    let selectedTipoPart = prueba3.find(
      (x) => Number(x.IdTipoPartitura) === this.IdTipoPartitura
    );

    saveAs(
      await jszip.generateAsync({ type: 'blob' }),
      selectedTipoPart.ClaveTipoPartitura.replace(' ', '_') +
        '_' +
        selectedInstr.Instrumento +
        '_' +
        selectedPaper.Nombre +
        '.zip'
    );
  }

  async VerPartitura(RutaArchivo: string) {
    var url = await this.servicioPartituras.getUrlPartitura_Angular(
      RutaArchivo
    );
    window.open(url);
  }

  async EliminarPartitura(ClavePartitura:number){

    let ClaveTipoPartitura_aux: string;
    let prueba3 = this.TipoPartitura as unknown as TipoPartitura[];
    ClaveTipoPartitura_aux = prueba3.find(
          (x) => Number(x.IdTipoPartitura) === this.IdTipoPartitura
        ).ClaveTipoPartitura;


    this.servicioPartituras.borrarPartitura(this.IdTipoPartitura,this.TipoInstrumento,this.TipoPaper,ClaveTipoPartitura_aux,ClavePartitura).then(resp => {
      Swal.fire({
        title: 'Vols esborrar la partitura?',
        text: "Cuido, si l'esborres ja no es podrà recuperar...",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2caa1b',
        cancelButtonColor: '#f27c32',
        confirmButtonText: 'Sii, esborra-la!',
        cancelButtonText: "No, es broma"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Perfecte!!',
            'Has borrat correctament la Partitura!!',
            'success'
          ).then(()=>{
            this.loadPartitures()
          })
        }else if (result.dismiss === Swal.DismissReason.cancel){
          Swal.fire(
            'No esborrat',
            'Arxiu no esborrat.',
            'warning'
          )
        }
      })



      // Swal.close();
      // Swal.fire(
      //   'Perfecte!',
      //   'Has borrat correctament la Partitura',
      //   'success'
      // ).then((result=>{

      // }))
    })
    .catch(error => {
        let MensajeError = "Error eliminant la Partitura, parla en Izan "

        Swal.close();
        Swal.fire({
          icon:'error',
          titleText: "Error borrant partitura",
          html: MensajeError,
          confirmButtonText: 'ok'
        });
    })

    Swal.close();
  }
}
