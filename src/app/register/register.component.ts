import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../models/usuario.model';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Usuario: UsuarioModel;

  constructor(private authService:AuthService, private router:Router,private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.Usuario = new UsuarioModel();
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
          /* Read more about handling dismissals below */
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
          confirmButtonText: 'Okei :('
        });
      });
  }

}
