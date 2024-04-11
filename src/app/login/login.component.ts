import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../models/usuario.model';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Usuario: UsuarioModel;

  constructor(private authService: AuthService, private router:Router) {
    console.log(this.router.getCurrentNavigation().extras);
  }

  ngOnInit(): void {
    this.Usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm): void {

    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text: "Espere perfa..."
    });
    Swal.showLoading();

    this.authService.login_Angular(this.Usuario)
    .then(resp => {

      this.authService.getNombre(resp.user.uid).then(resp1=>{
        let Nombre: String = "";
        console.log(resp1);
        Nombre = resp1;
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Perfecte',
          html: "Hola " + resp1,
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            this.authService.isLoggedIn = observableOf(true)
            this.reloadPage();
          }
        })
      })


    })
    .catch(error => {
      this.authService.isLoggedIn = observableOf(false)
      let authError = error as FirebaseError;
        let errorCode = authError.code;
        let MensajeError = "Error no tratat"

        Swal.close();

        if (errorCode == "auth/user-not-found") {
          MensajeError = "Este email no te un compter creat, <br>si en vols un parlali a Izan";
        }else if(errorCode == "auth/wrong-password"){
          MensajeError = "Contrasenya incorrecta";
        }else{
          MensajeError = "Error no tratat, parlali a Izan i dis-li: <br><b>" + errorCode+"</b>";
        }

        Swal.fire({
          icon:'error',
          titleText: "Error Iniciant Sessió",
          html: MensajeError,
          confirmButtonText: 'Ok'
        });
    })
  }

  reloadPage(): void {
    this.router.navigate(['/partitures']);
  }

  ResetPass():void{
    this.router.navigate(['/reset-email']);
  }

}
