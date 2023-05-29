export class TipoInstrumento{
    Clave: number;
    Instrumento: string;


    public constructor(Clave?: number, Instrumento?:string) {
      this.Clave = Clave;
      this.Instrumento = Instrumento;
    }
}
