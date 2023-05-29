export class PartituraModel{
    Clave: number;
    Nombre: string;


    public constructor(Clave?: number, Nombre?:string) {
      this.Clave = Clave;
      this.Nombre = Nombre;
    }

}
