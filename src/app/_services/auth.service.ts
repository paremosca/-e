import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, Unsubscribe, signInAnonymously, sendPasswordResetEmail } from '@angular/fire/auth';
import { UsuarioModel } from '../models/usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  set isLoggedIn(valor){
    valor.subscribe(resp=>{
      this.loggedIn.next(resp);
    })
  }

  UserIsLogged: Promise<boolean> = this.IsLogged();

  constructor(private http: HttpClient, private auth: Auth, private router:Router) {}

  async IsLogged(): Promise<boolean>{

    try {
      await this.waitForAuthInit();

      console.log(this.auth);

      var prueba3 = this.auth.currentUser != null ? this.auth.currentUser.uid != null ? true : false : false

      this.loggedIn.next(prueba3);

      return this.auth.currentUser != null ? this.auth.currentUser.uid != null ? true : false : false;


    } catch (err: any) {
      console.log('Failed to get current user...', err);
      return false;
    }
  }

  public async waitForAuthInit() {
    let unsubscribe: Unsubscribe;
    await new Promise<void>((resolve) => {
      unsubscribe = this.auth.onAuthStateChanged((_) => resolve());
    });
    (await unsubscribe!)();
  }

  getUID():string{
    return this.auth.currentUser.uid != null ? this.auth.currentUser.uid : '';
  }

  login_Angular(Usuario:UsuarioModel){
    return signInWithEmailAndPassword(this.auth, Usuario.email, Usuario.password)
  }

  register_Angular(Usuario:UsuarioModel){
    return createUserWithEmailAndPassword(this.auth,Usuario.email,Usuario.password);
  }

  login_Anonimous_Angular(){
    return signInAnonymously(this.auth);
  }

  resetPassword_Angular(Usuario:UsuarioModel){
    return sendPasswordResetEmail(this.auth,Usuario.email);
  }

  logout_Angular(){
    var prueba2 = signOut(this.auth);

    prueba2.then(resp=>{
      this.loggedIn.next(false);
    })

    return prueba2;
  }

}
