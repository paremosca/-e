import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage,ref, uploadBytes, listAll, getDownloadURL} from '@angular/fire/storage'
import { AuthService } from '../_services/auth.service';
import { formPartituraModel } from '../models/formPartitura.model';
import { DocPartitura } from '../models/DocPartitura.model';
import { TipoInstrumento } from '../models/tipoinstrumento.model';
import { PartituraModel } from '../models/partitura.model';
import { Observable } from 'rxjs';
import { PartiturasService } from '../_services/partituras.service';
import { serverTimestamp } from '@firebase/firestore';
import Swal from 'sweetalert2';

interface Instrument {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-add-partitura',
  templateUrl: './add-partitura.component.html',
  styleUrls: ['./add-partitura.component.css']
})
export class AddPartituraComponent implements OnInit {

  constructor(private ServicioPartituras:PartiturasService, private route: ActivatedRoute, private router:Router, private storage: Storage, private auth:AuthService) { }

  formPartitura: formPartituraModel;
  docPartitura: DocPartitura;

  imagenBase64: string;
  selectedValueInstrumento: number;
  selectedValuePaper: number;

  isPDF: Boolean

  TipoInstrumentos: Observable<TipoInstrumento[]>
  TipoPaperPartitura: PartituraModel[]

  ngOnInit(): void {

    this.formPartitura = new formPartituraModel();
    this.docPartitura = new DocPartitura();

    this.formPartitura.NombrePartitura = this.route.snapshot.paramMap.get("Nombre")
    this.formPartitura.ClavePartitura = Number(this.route.snapshot.paramMap.get("Clave"))
    this.formPartitura.ClaveTipo = Number(this.route.snapshot.paramMap.get("Tipo"))
    this.formPartitura.ClaveInstrumento = Number(this.route.snapshot.paramMap.get("ClaveInstrument"))
    this.formPartitura.ClaveTipoPaper = Number(this.route.snapshot.paramMap.get("ClavePaper"))

    this.ServicioPartituras.getTipoInstrumentos_Angular().then(Response=>{
      console.log(Response);
      this.TipoInstrumentos = Response

    },err=>{
      console.log(err)
    })

    this.ServicioPartituras.getTipoPaperPartitura_Angular().subscribe({
      next: (v) => this.TipoPaperPartitura = v,
      error: (e) => console.error(e)
  })

    if(!this.formPartitura.ClaveInstrumento){
      this.formPartitura.ClaveInstrumento = 9
    }
    if(!this.formPartitura.ClaveTipoPaper){
      this.formPartitura.ClaveTipoPaper = 1
    }

    this.getImages()
  }

  fileAttr = 'Selecciona un fitxer';
  uploadFileEvt(imgFile: any) {

    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name;
      });

      const file = imgFile.target.files[0];
      this.formPartitura.BytesFichero = imgFile.target.files[0];
      console.log(file)
      console.log(file.type);

      this.isPDF = file.type == "application/pdf" ? true : false;
      console.log(this.isPDF);

    // HTML5 FileReader API
      let reader = new FileReader();
      this.imagenBase64 = ''
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        this.imagenBase64 = e.target.result;
      };
      reader.readAsDataURL(imgFile.target.files[0]);

    } else {
      this.fileAttr = 'Selecciona un fitxer';
    }
  }

  getImages(){
    const imagesRef = ref(this.storage, 'images');
    listAll(imagesRef)
    .then(async response=>{
      for(let item of response.items){
        const url = await getDownloadURL(item);
      }
    })
    .catch(error=>{
      console.log(error)
    })
  }

  async onSubmit(form: NgForm) {

    console.log(form);

    console.log(this.formPartitura);
    if (form.invalid) {
      return;
    }

    const file = this.formPartitura.BytesFichero

    const NombreArchivo = this.formPartitura.NombrePartitura + file.name.substr(file.name.lastIndexOf('.'));

    const NombreRuta = `Partitures/${this.formPartitura.ClaveTipo}/${this.formPartitura.ClavePartitura}/${this.formPartitura.ClaveInstrumento}/${this.formPartitura.ClaveTipoPaper}/${NombreArchivo}`

    this.docPartitura.Id = `${this.formPartitura.ClaveTipo}_${this.formPartitura.ClavePartitura}_${this.formPartitura.ClaveInstrumento}_${this.formPartitura.ClaveTipoPaper}`;
    this.docPartitura.ClaveInstrumento = this.formPartitura.ClaveInstrumento;
    this.docPartitura.ClaveTipoPaper = this.formPartitura.ClaveTipoPaper;

    const current = new Date();
    this.docPartitura.FechaInsert = current.toString()

    this.docPartitura.RutaArchivo = NombreRuta;
    this.docPartitura.IdUsuario = this.auth.getUID();


    console.log(this.docPartitura);

    const response = await this.ServicioPartituras.setPartitura_Angular(this.docPartitura,this.formPartitura);
    console.log(response);

    const imgRef = ref(this.storage, `Partitures/${this.formPartitura.ClaveTipo}/${this.formPartitura.ClavePartitura}/${this.formPartitura.ClaveInstrumento}/${this.formPartitura.ClaveTipoPaper}/${NombreArchivo}`)
      uploadBytes(imgRef, file)
      .then(response =>{
        console.log(response)

        Swal.close();
      Swal.fire(
        'Perfecte!',
        'Partitura guardada correctament',
        'success'
      ).then((result=>{
        //this.router.navigate(['/partitures']);
      }))})
      .catch(error=>
        console.log(error)
        );

  }

}
