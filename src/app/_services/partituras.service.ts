import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDocs, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { getDownloadURL, listAll, ref, Storage } from '@angular/fire/storage';
import { deleteDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { DocPartitura } from '../models/DocPartitura.model';
import { DocsPartitura } from '../models/DocsPartitura.model';
import { formPartituraModel } from '../models/formPartitura.model';
import { PartituraModel } from '../models/partitura.model';
import { TipoInstrumento } from '../models/tipoinstrumento.model';
import { TipoPartitura } from '../models/TipoPartitura.model';
import { UsuarioModel } from '../models/usuario.model';

const AUTH_API = 'https://localhost:7201/api/partituras/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set("APISIM","1234")
};

@Injectable({
  providedIn: 'root'
})
export class PartiturasService {

  constructor(private http: HttpClient, private firestore:Firestore, private storage:Storage) { }

  getPartituras(token: string, tipoPartitura: string, tipoInstrumento: string):Observable<any>
  {

    const httpOptions1 = {
      headers: new HttpHeaders({'Content-Type': 'application/json','APISIM':'1234','TokenAuth':token})
    };


    //httpOptions.headers.set('idtoken',token);
    console.log(AUTH_API + 'getPartituras/'+tipoPartitura + '/' + tipoInstrumento);

    return this.http.get(AUTH_API + 'getPartituras/'+tipoPartitura + '/' + tipoInstrumento, httpOptions1);
  }

  async getPartituras_Angular(IdTipoPartitura:number, TipoInstrumento:number, TipoPaper:number):Promise<Observable<DocsPartitura[]>>{

    var ClaveTipoPartitura = "";

    const ClaveTipoPartituraRef = collection(this.firestore, '/TipoPartituras');
    const q2 = query(ClaveTipoPartituraRef, where("IdTipoPartitura","==",IdTipoPartitura));
    const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(async (doc2) => {
        //console.log(doc1);

        ClaveTipoPartitura = doc2.data().ClaveTipoPartitura;
        //console.log(doc2.data().ClaveTipoPartitura);
      });

    let docs = new Array<DocsPartitura>();
    const PartutyraRef = collection(this.firestore, `/TipoPartituras/${IdTipoPartitura}/${ClaveTipoPartitura}`);
    const q = query(PartutyraRef,where("esToca","==",true), orderBy('Nombre'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      let doc_aux = new PartituraModel()
      doc_aux = doc.data() as PartituraModel
      //console.log(doc.data())
      let DocGrid = new DocsPartitura();
      DocGrid.Clave = doc_aux.Clave;
      DocGrid.Nombre = doc_aux.Nombre;
      DocGrid.ClaveInstrumento = TipoInstrumento;
      DocGrid.ClaveTipoPaper = TipoPaper;


      //console.log(doc_aux);

      const PartituraByInstrRef = collection(this.firestore,`/TipoPartituras/${IdTipoPartitura}/${ClaveTipoPartitura}/${doc_aux.Clave}/Documentos`);

      //console.log(PartituraByInstrRef);

      const q1 = query(PartituraByInstrRef, where("ClaveInstrumento", "==", TipoInstrumento), where("ClaveTipoPaper", "==", TipoPaper));
      const querySnapshot1 = await getDocs(q1);
      querySnapshot1.forEach(async (doc1) => {
        //console.log(doc1);
        let doc_where = new DocPartitura();
        doc_where = doc1.data() as DocPartitura

        DocGrid.ClaveInstrumento = doc_where.ClaveInstrumento
        DocGrid.ClaveTipoPaper = doc_where.ClaveTipoPaper
        DocGrid.FechaInsert = doc_where.FechaInsert
        DocGrid.IdUsuario = doc_where.IdUsuario
        DocGrid.RutaArchivo = doc_where.RutaArchivo

        console.log(doc_where);
      });

      docs.push(DocGrid)

    });

    return docs as unknown as Observable<DocsPartitura[]>;
  }

  async getTipoInstrumentos_Angular(): Promise<Observable<TipoInstrumento[]>>{
    let docs = new Array<TipoInstrumento>();
    const PartutyraRef = collection(this.firestore, '/TipoInstrumento');
    const q = query(PartutyraRef, orderBy('Instrumento'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let doc_aux = new TipoInstrumento()
      doc_aux = doc.data() as TipoInstrumento
      docs.push(doc_aux)
    });

    return docs as unknown as Observable<TipoInstrumento[]>;

  }

  getTipoPaperPartitura_Angular():Observable<PartituraModel[]>{
    const TipoInstrumentoRef = collection(this.firestore, '/TipoPaperPartitura');
    return collectionData(TipoInstrumentoRef,{idField:'id'}) as Observable<PartituraModel[]>
  }

  async setPartitura_Angular(docPartitura:DocPartitura, formPartitura:formPartituraModel){
    //var docRef = collection(this.firestore,'prueba');

    var ClaveTipoPartitura = "";

    const ClaveTipoPartituraRef = collection(this.firestore, '/TipoPartituras');
    const q2 = query(ClaveTipoPartituraRef, where("IdTipoPartitura","==",formPartitura.ClaveTipo));
    const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(async (doc2) => {
        //console.log(doc1);

        ClaveTipoPartitura = doc2.data().ClaveTipoPartitura;
        //console.log(doc2.data().ClaveTipoPartitura);
      });

    await setDoc(doc(this.firestore,`TipoPartituras/${formPartitura.ClaveTipo}/${ClaveTipoPartitura}/${formPartitura.ClavePartitura}/Documentos`,docPartitura.Id),{
      ClaveInstrumento:docPartitura.ClaveInstrumento,
      ClaveTipoPaper: docPartitura.ClaveTipoPaper,
      IdUsuario: docPartitura.IdUsuario,
      FechaInsert: docPartitura.FechaInsert,
      RutaArchivo: docPartitura.RutaArchivo
    }).then(async resp=>{
      console.log(resp)
      return await resp;
    }).catch(err=>{
      console.log(err)
    })
// docRef.
//     console.log(docRef)
// docRef.Document(docPartitura.Id).setAsync(docPartitura)

    //return addDoc(docRef, docPartitura)
  }

  async getUrlPartitura_Angular(ruta:string):Promise<string>{

    //console.log(ruta.split("/").slice(0, ruta.split("/").length - 1).join("/"));

    // const imagesRef = ref(this.storage, ruta.split("/").slice(0, ruta.split("/").length - 1).join("/"));
     var resp_url: string = "";
    // await listAll(imagesRef)
    // .then(async response=>{
    //   for(let item of response.items){
    //     const url = await getDownloadURL(item);
    //     console.log(url)
    //     resp_url = url;
    //   }
    // })
    // .catch(error=>{
    //   console.log(error)
    // })

    await getDownloadURL(ref(this.storage,ruta)).then((url)=>{
      //console.log(url)
      resp_url = url;
    })

    return resp_url;

  }

  async getTipoPartituras_Angular(): Promise<Observable<TipoPartitura[]>>{
    let docs = new Array<TipoPartitura>();
    const PartutyraRef = collection(this.firestore, '/TipoPartituras');
    const q = query(PartutyraRef, orderBy('IdTipoPartitura'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      let doc_aux = new TipoPartitura()
      doc_aux = doc.data() as TipoPartitura

      //if (doc_aux.RutaIcono != null){
        getDownloadURL(ref(this.storage,doc_aux.RutaIcono)).then((url)=>{
          doc_aux.RutaIcono = url;
        })
      //}

      docs.push(doc_aux)
    });

    return docs as unknown as Observable<TipoPartitura[]>;

  }

  async borrarPartitura(IdTipoPartitura:number, TipoInstrumento:number, TipoPaper:number, ClaveTipoPartitura:string, ClavePartitura:number): Promise<any>{
    let resp_aux;

    let id_aux: string = `${IdTipoPartitura}_${ClavePartitura}_${TipoInstrumento}_${TipoPaper}`;

    console.log(id_aux)
    console.log(`/TipoPartituras/${IdTipoPartitura}/${ClaveTipoPartitura}/${ClavePartitura}/Documentos`)
    resp_aux = await deleteDoc(doc(this.firestore,`/TipoPartituras/${IdTipoPartitura}/${ClaveTipoPartitura}/${ClavePartitura}/Documentos`,id_aux)).then(res=>{
      console.log(res);
    })
    return resp_aux
  }


  async setPropertyPartituras(){
    const q = query(collection(this.firestore, "/TipoPartituras/7/Marxes Provesso"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc1) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc1.id, " => ", doc1.data());

      const frankDocRef = doc(this.firestore, "/TipoPartituras/7/Marxes Provesso", doc1.id);
      await updateDoc(frankDocRef, {
        esToca:true
    });

    });
  }

  async getPartitura(ClaveInstrument:number, ClavePaper:number, IdTipoPartitura:number,ClaveDoc:number):Promise<Observable<DocPartitura[]>>{
    let docs = new Array<DocPartitura>();
    var ClaveTipoPartitura = "";

    const ClaveTipoPartituraRef = collection(this.firestore, '/TipoPartituras');
    const q2 = query(ClaveTipoPartituraRef, where("IdTipoPartitura","==",IdTipoPartitura));
    const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(async (doc2) => {
        ClaveTipoPartitura = doc2.data().ClaveTipoPartitura;
      });

    const PartituraByInstrRef = collection(this.firestore,`/TipoPartituras/${IdTipoPartitura}/${ClaveTipoPartitura}/${ClaveDoc}/Documentos`);
    const q1 = query(PartituraByInstrRef, where("ClaveInstrumento", "==", ClaveInstrument), where("ClaveTipoPaper", "==", ClavePaper));
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
      let doc_aux = new DocPartitura()
      doc_aux = doc.data() as DocPartitura
      docs.push(doc_aux)
    });

      return docs as unknown as Observable<DocPartitura[]>;
  }

}
