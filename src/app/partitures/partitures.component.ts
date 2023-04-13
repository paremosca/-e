import { Component,OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPartitura } from '../models/TipoPartitura.model';
import { PartiturasService } from '../_services/partituras.service';

@Component({
  selector: 'app-partitures',
  templateUrl: './partitures.component.html',
  styleUrls: ['./partitures.component.css']
})
export class PartituresComponent implements OnInit {

  public IdTipoPartitura: number;
  public showFiller = true;
  TipoPartitura: Observable<TipoPartitura[]>;

  handleSidebarToggle(){
    this.showFiller = !this.showFiller;
  }

  constructor(private servicioPartitura:PartiturasService) {}


  ngOnInit(): void {
     this.IdTipoPartitura = 1;

    this.servicioPartitura.getTipoPartituras_Angular().then(Response=>{
      console.log(Response)
      this.TipoPartitura = Response
    }).catch(err=>{
      console.log(err)
    })

  }

  changeIdTipoPartitura(IdTipo:number){
    console.log(IdTipo);
    this.IdTipoPartitura = IdTipo;
  }

}
