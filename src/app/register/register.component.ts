import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PartituraModel } from '../models/partitura.model';
import { TipoInstrumento } from '../models/tipoinstrumento.model';
import { UsuarioModel } from '../models/usuario.model';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Usuario: UsuarioModel;
  LOPDAceptada: boolean;

  TipoInstrumentos: TipoInstrumento[];
  TipoPaperPartitura: PartituraModel[];
  ClaveInstrumento: number;
  ClaveTipoPaper:number;

  constructor(private authService:AuthService, private router:Router,private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.Usuario = new UsuarioModel();
    this.TipoInstrumentos = new Array<TipoInstrumento>();
    this.TipoPaperPartitura = new Array<PartituraModel>();

    this.LOPDAceptada = false;
    this.TipoInstrumentos.push(new TipoInstrumento(1,"Percusió-Caixa"));
    this.TipoInstrumentos.push(new TipoInstrumento(2,"Percusió-Bombo-Plats"));
    this.TipoInstrumentos.push(new TipoInstrumento(3,"Baix"));
    this.TipoInstrumentos.push(new TipoInstrumento(4,"Trombó"));
    this.TipoInstrumentos.push(new TipoInstrumento(5,"Trompa"));
    this.TipoInstrumentos.push(new TipoInstrumento(6,"Trompeta"));
    this.TipoInstrumentos.push(new TipoInstrumento(7,"Saxo Alt"));
    this.TipoInstrumentos.push(new TipoInstrumento(8,"Saxo Tenor"));
    this.TipoInstrumentos.push(new TipoInstrumento(9,"Clarinet"));
    this.TipoInstrumentos.push(new TipoInstrumento(10,"Flauta"));
    this.TipoInstrumentos.push(new TipoInstrumento(11,"Bombardi"));

    this.TipoPaperPartitura.push(new PartituraModel(1,"1er"))
    this.TipoPaperPartitura.push(new PartituraModel(2,"2on"))
    this.TipoPaperPartitura.push(new PartituraModel(3,"3er"))
    this.TipoPaperPartitura.push(new PartituraModel(4,"Ppal"))

    //this.ClaveInstrumento = 8;
    //this.ClaveTipoPaper = 1;
  }

  mostrarLOPD():void{

    this.LOPDAceptada = false;

    // Swal.close();
    //   Swal.fire({
    //     allowOutsideClick: false,
    //     title: 'Accepta la LOPD! (al final)',
    //     html: this.getLOPD(),
    //     icon:'success',
    //     width:800,

    //   }).then((result=>{
    //     this.LOPDAceptada = true;
    //   }))
  }


  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text: "Espera perfa..."
    });
    Swal.showLoading();

    this.authService.register_Angular(this.Usuario)
      .then(response => {
        this.Usuario.uid = response.user.uid;
        this.authService.setUsuario_Angular(this.Usuario).then((resp)=>{
          console.log(resp);
          console.log("esto es el return del set Usuario")
        })


        Swal.close();

        Swal.fire({
          icon: 'success',
          title: 'Ja t\'has registrat!!',
          html: 'T\'has registrat correctament, especial.',
          timer: 4000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigate(['/partitures']);
          }
        })

      })
      .catch(error => {
        let authError = error as FirebaseError;
        let errorCode = authError.code;
        let MensajeError = "Error no tratat"

        Swal.close();

        if (errorCode == "auth/email-already-in-use") {
          MensajeError = "El emaill ja està registrat, Inicia Sessió";
        }else{
          MensajeError = "Error no tratat, parlali a Izan i dis-li: " + errorCode;
        }

        Swal.fire({
          icon:'error',
          titleText: "Error creant Usuari",
          text: MensajeError,
          confirmButtonText: 'Ok'
        });
      });
  }


  getLOPD():string{
    return `No`
  }

  VerPolitica(): void {
    this.router.navigate(['/politica']);
  }

}
