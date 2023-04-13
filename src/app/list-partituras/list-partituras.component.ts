import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { DocsPartitura } from '../models/DocsPartitura.model';
import { PartituraModel } from '../models/partitura.model';
import { TipoInstrumento } from '../models/tipoinstrumento.model';
import { PartiturasService } from '../_services/partituras.service';

@Component({
  selector: 'app-list-partituras',
  templateUrl: './list-partituras.component.html',
  styleUrls: ['./list-partituras.component.css'],
})
export class ListPartiturasComponent implements OnInit {
  @Input() IdTipoPartitura: number;

  listPartitures: Observable<DocsPartitura[]>;
  TipoInstrumentos: Observable<TipoInstrumento[]>;
  TipoPaperPartitura: PartituraModel[];
  term!: string;

  TipoInstrumento: number = 8;
  TipoPaper: number = 1;

  constructor(private servicioPartituras: PartiturasService) {}

  ngOnInit(): void {
    this.servicioPartituras.getTipoInstrumentos_Angular().then(
      (Response) => {
        console.log(Response);
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
    this.servicioPartituras.getPartituras_Angular(this.IdTipoPartitura, this.TipoInstrumento, this.TipoPaper)
      .then(
        (Response) => {
          console.log(Response);
          this.listPartitures = Response;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async VerPartitura(RutaArchivo: string) {
    var url = await this.servicioPartituras.getUrlPartitura_Angular(RutaArchivo);
    console.log(url)
    window.open(url);
  }
}
