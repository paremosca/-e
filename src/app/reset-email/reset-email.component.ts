import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.css']
})
export class ResetEmailComponent implements OnInit {
  Usuario: UsuarioModel;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.Usuario = new UsuarioModel();
  }

  prueba():void{
    this.router.navigate(['/login']);

  }

  onSubmit(form: NgForm): void {

  }

}
