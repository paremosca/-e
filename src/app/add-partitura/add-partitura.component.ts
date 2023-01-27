import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { SvcPartituresService } from '../svc_Partitures/svc-partitures.service';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private servicioPartitures: SvcPartituresService) { }

  form: FormGroup;
  imagenBase64: string;
  selectedValue: number;


  instruments: Instrument[] = [
    { value: 1, viewValue: 'PERCUSIÓ-CAIXA' },
    { value: 2, viewValue: 'PERCUSIÓ-BOMBO-PLATS' },
    { value: 3, viewValue: 'BAIX' },
    { value: 4, viewValue: 'TROMBÓ' },
    { value: 5, viewValue: 'TROMPA' },
    { value: 6, viewValue: 'TROMPETA' },
    { value: 7, viewValue: 'SAXO ALT' },
    { value: 8, viewValue: 'SAXO TENOR' },
    { value: 9, viewValue: 'CLARINET' },
    { value: 10, viewValue: 'FLAUTA' },
    { value: 11, viewValue: 'BOMBARDI' },
  ];


  ngOnInit(): void {
    this.selectedValue = this.instruments[7].value;

    this.form = this.formBuilder.group({
      nombre: [
        this.route.snapshot.paramMap.get("Nombre"),
        {

        },
        //{
        //  validators: [Validators.required],
        //},
      ],
      instrument: [this.selectedValue],
      imagen_upload: ['',
      {
        Validators: [Validators.required],
        },
      ],
    });
  }

  //@ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Selecciona un fitxer';
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name;
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      this.imagenBase64 = ''
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
          this.imagenBase64 = imgBase64Path
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      const file: File = imgFile.target.files[0];
      this.form.get('imagen_upload').setValue(imgFile);


      //console.log(imgFile);
      //this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Selecciona un fitxer';
    }
  }

  onSubmit() {

    this.servicioPartitures.UploadBlob(this.form).subscribe(data => {
      console.log(data);
      console.log("tot bé");
      this.router.navigate(['/partitures'])
    }, errors => {
      console.log(errors)
      console.log("tot mal");
    });
  }

}
