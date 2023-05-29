import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPartitura } from '../models/TipoPartitura.model';
import { AuthService } from '../_services/auth.service';
import { PartiturasService } from '../_services/partituras.service';

@Component({
  selector: 'app-partitures',
  templateUrl: './partitures.component.html',
  styleUrls: ['./partitures.component.css'],
})
export class PartituresComponent implements OnInit {
  public IdTipoPartitura: number;
  public ClaveInstrument: number;
  public ClavePaper: number;
  public showFiller = true;
  TipoPartitura: Observable<TipoPartitura[]>;

  handleSidebarToggle() {
    this.showFiller = !this.showFiller;
  }

  constructor(private servicioPartitura: PartiturasService, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.IdTipoPartitura = 1;
    this.ClaveInstrument = 8;

    if (this.authService.getUID()){
      await this.authService.getClaveInstrument(this.authService.getUID()).then(resp=>{
        this.ClaveInstrument = resp;
      })

      await this.authService.getClavePaper(this.authService.getUID()).then(resp=>{
        this.ClavePaper = resp;
      })
    }

    this.servicioPartitura
      .getTipoPartituras_Angular()
      .then((Response) => {
        this.TipoPartitura = Response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeIdTipoPartitura(IdTipo: number) {
    this.IdTipoPartitura = IdTipo;
  }
}
