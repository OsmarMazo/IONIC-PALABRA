import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.scss'],
})
export class FilaComponent  implements OnInit {

  
  @Input() filaActiva: boolean = false;
  @Input() resultado: string[] = [];
  @Output() filaCompleta = new EventEmitter<string[]>();
  @Output() siguienteFila = new EventEmitter<void>();
  @Input() palabra!: string  //item palabra de cada celda de palabras enviadas por laravel
  @Input() letras!: string[] //letras ingresadas en la celda
  public opcion: string = ''
  @Input() letra!: string
    //letras: string[] = []; // Arreglo para almacenar los valores de las celdas
    celdasCompletas: boolean[] = [false, false, false, false, false];
    public css: string = '' //1. igual Verde. 2. naranja. 3. gris
    constructor() { }

  ngOnInit() {

    return 0
  }

  capturarValor(event: {valor: string, enterPressed: boolean}, index: number) {
    const { valor, enterPressed } = event;

    // Verificar que el valor no esté vacío y sea una letra
    if (valor && /^[a-zA-Z]$/.test(valor)) {
      this.letras[index] = valor.toLowerCase(); // Almacenar la letra en mayúscula
      this.celdasCompletas[index] = true; // Marcar la celda como completa
    } else {
      // Si el valor es vacío o no es una letra, resetear la letra y marcar la celda como incompleta
      this.letras[index] = '';
      this.celdasCompletas[index] = false;
    }
  }

  veriFicarFilaCompleta() {
        // Verificar si todas las celdas están completas
        const filaCompleta = this.celdasCompletas.every(completa => completa);

        console.log(this.letras);
        // Si todas las celdas están completas, emitir el arreglo de letras
      if (filaCompleta) {
        this.filaCompleta.emit(this.letras);
        if (this.resultado.join('') !== 'verde'.repeat(5)) { // Comprobamos si el resultado es diferente de [verde, verde, verde, verde, verde]
          this.siguienteFila.emit(); // Si no es verde, pasamos a la siguiente fila
        }
        //console.log('Fila completa:', this.letras);
      } else {
        console.log('Faltan letras en la fila.'); //Problema de optimización aquí: se están evaluando también las filas inactivas
      }
  }
  verificarFilaCompleta() {
        // Verificar si todas las celdas están completas
        const filaCompleta = this.celdasCompletas.every(completa => completa);

        console.log(this.letras);
        // Si todas las celdas están completas, emitir el arreglo de letras
      if (filaCompleta) {
        this.filaCompleta.emit(this.letras);
        if (this.resultado.join('') !== 'acierto'.repeat(5)) { // Comprobamos si el resultado es diferente de [verde, verde, verde, verde, verde]
          this.siguienteFila.emit(); // Si no es verde, pasamos a la siguiente fila
        }
        //console.log('Fila completa:', this.letras);
      } else {
        console.log('Faltan letras en la fila.'); //Problema de optimización aquí: se están evaluando también las filas inactivas
      }
  }


  onComprobar(){
    if(this.opcion==this.letra){
      this.css = 'acierto'
    } else {
      if(this.palabra.includes(this.opcion)){
        this.css = 'casi'
      } else {
        this.css = 'fallo'
      }
    }
  }

}
