import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  public tiempoRestante:number =0;
  private intervalo: any;

  tiempo= {
    minutos: 0,
    segundos: 0,
    milisegundos: 0,
  };

  constructor(public http: HttpClient ) { 
      this.setTimer();
      

  }

  setTimer(){
      //console.log('en timer ->', this.tiempo);

      this.tiempo.milisegundos +=10; //milisegundos 1000ms = 1s
      if(this.tiempo.milisegundos ===60){
        this.tiempo.milisegundos = 0;

      }

      this.tiempo.segundos ++;    //segundos
      if(this.tiempo.segundos === 60) {
        this.tiempo.segundos = 0;
        this.tiempo.minutos ++;
      }
      if(this.tiempo.minutos ===60){    //minutos
        this.tiempo.minutos = 0;
        this.tiempo.segundos = 0;
        this.tiempo.milisegundos = 0;

      }

    setTimeout(() => {
        this.setTimer();
    }, 1000);
  }

  iniciarTiempo(tiempoLimite: number, juegoPerdidoCallback: () => void) {
    this.tiempoRestante = tiempoLimite;
    this.intervalo = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalo);
        juegoPerdidoCallback(); // Llamar a la función de juego perdido cuando se excede el tiempo límite
      }
    }, 1000);
  }

  detenerTiempo() {
    clearInterval(this.intervalo);
  }

  guardarRecord(tiempo: number) {
    const record = {
      user_id: 1, // Reemplaza con el ID del usuario si estás autenticando usuarios
      tiempo: tiempo
    };
  
    this.http.post('http://tu-api-laravel/records', record)
      .subscribe(response => {
        console.log('Record guardado exitosamente');
      }, error => {
        console.error('Error al guardar el record:', error);
      });
  }



}




