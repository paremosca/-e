import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  RedirectPartitures(){
    this.router.navigate(['/partitures'])
  }


  PruebaInsert(){

    const idPersonalizado = "TU_ID_PERSONALIZADO";
    const partituras = 10; // Puedes cambiar esto por el valor deseado
    const log = [
      { fecha: "2024-04-12 00:00:00", nombre: "Evento 1" },
      { fecha: "2024-04-13", nombre: "Evento 2" }
    ];

    const logConFechasDate = log.map(item => ({
      fecha: new Date(item.fecha),
      nombre: item.nombre
    }));

    const logFormatoEsperado = logConFechasDate.map(item => {
      const mapa = new Map();
      mapa.set(item.fecha, item.nombre);
      return mapa;
    });

    let Nombre: string = "Fallo";
    this.authService.getNombre(this.authService.getUID()).then(resp1=>{
      Nombre = resp1;
      this.authService.UpsertEstadistica(Nombre,logConFechasDate)
      .then(resp => {

      })
    })

  }

}
