import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.css']
})
export class ResetEmailComponent implements OnInit {
  Usuario: UsuarioModel;
  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.Usuario = new UsuarioModel();
  }

  prueba():void{
    this.router.navigate(['/login']);

  }

  onSubmit(form: NgForm): void {

    if (form.invalid) {
      return;
    }

    this.auth.resetPassword_Angular(this.Usuario).then(Resp=>{
      console.log(Resp);
    }).catch(err=>{
      console.log(err)
    })

  }

}
