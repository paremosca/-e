import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, Unsubscribe, signInAnonymously, sendPasswordResetEmail } from '@angular/fire/auth';
import { UsuarioModel } from '../models/usuario.model';
import { Router } from '@angular/router';
import { addDoc, collection, doc, DocumentReference, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { updateDoc } from '@firebase/firestore';

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

  constructor(private http: HttpClient, private auth: Auth, private router:Router,private firestore:Firestore) {}

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

  async getEsArxiver(uid:string):Promise<boolean>{
    let EsArxiver: boolean = false;

    const ClaveTipoPartituraRef = collection(this.firestore, '/usuarios');
    const q2 = query(ClaveTipoPartituraRef, where("uid","==",uid));
    const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(async (doc2) => {
        //console.log(doc1);
        console.log("haentratraro")

        let prueba = doc2.data() as UsuarioModel;
        console.log(prueba.EsArxiver);

        if (prueba.EsArxiver){
          EsArxiver = true;
        }

        console.log(doc2.data());
      });
      return EsArxiver;
  }

  async getEsAdmin(uid:string):Promise<boolean>{
    let EsAdmin: boolean = false;
    const ClaveTipoPartituraRef = collection(this.firestore, '/usuarios');
    const q2 = query(ClaveTipoPartituraRef, where("uid","==",uid));
    const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(async (doc2) => {
        let prueba = doc2.data() as UsuarioModel;

        console.log(prueba);
        if (prueba.EsAdmin){
          EsAdmin = true;
        }

        console.log(doc2.data());
      });
      return EsAdmin;
  }

  async getClaveInstrument(uid:string):Promise<number>{
    let ClaveInstrument: number = 8;
    const ClaveTipoPartituraRef = collection(this.firestore, '/usuarios');
    const q2 = query(ClaveTipoPartituraRef, where("uid","==",uid));
    const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(async (doc2) => {
        let prueba = doc2.data() as UsuarioModel;
        if (prueba.ClaveInstrument){
          ClaveInstrument = prueba.ClaveInstrument;
        }
      });
      return ClaveInstrument;
  }

  async getClavePaper(uid:string):Promise<number>{
    let ClavePaper: number = 8;
    const ClaveTipoPartituraRef = collection(this.firestore, '/usuarios');
    const q2 = query(ClaveTipoPartituraRef, where("uid","==",uid));
    const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(async (doc2) => {
        let prueba = doc2.data() as UsuarioModel;
        if (prueba.ClavePaper){
          ClavePaper = prueba.ClavePaper;
        }
      });
      return ClavePaper;
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

  async setUsuario_Angular(Usuario:UsuarioModel){
    const dbRef = collection(this.firestore, "usuarios");
    const docref1 = await addDoc(dbRef,{
      Nombre: Usuario.nom,
      Apellidos: Usuario.apellidos,
      Email: Usuario.email,
      ClaveInstrument: Usuario.ClaveInstrument,
      ClavePaper: Usuario.ClavePaper,
      EsAdmin:false,
      EsArxiver:true,
      uid:Usuario.uid
    }).then(async resp=>{
      // await updateDoc(doc(this.firestore,"usuarios",resp.id),{
      //   uid:resp.id
      // });
      return await resp;
    }).catch(err=>{
      console.log(err)
    })

    return docref1;

}


}
