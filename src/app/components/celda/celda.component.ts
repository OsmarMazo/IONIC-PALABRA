import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.scss'],
})
export class CeldaComponent  implements OnInit {
  @Input() palabra!: string
  @Input() letra!: string
  public opcion: string = ''
  public css: string = '' //1. igual Verde. 2. naranja. 3. gris
  @Input() disabled: boolean = false;

  @Output() valorEmitido = new EventEmitter<{valor: string, enterPressed: boolean}>(); // EventEmitter para emitir el valor
  valor: string = ''; // Inicializamos con un valor por defecto
  constructor() { }

  ngOnInit() {
    return 0
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
  onValorChange() {
    // Si el valor no está vacío y es una letra, emitirlo
    if (this.valor.trim() && /^[a-zA-Z]$/.test(this.valor.trim())) {
      this.valorEmitido.emit({valor: this.valor.trim().toUpperCase(), enterPressed: false}); // Emitimos el valor en mayúscula
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.valorEmitido.emit({valor: this.valor.trim().toUpperCase(), enterPressed: true});
    }
  }

}
