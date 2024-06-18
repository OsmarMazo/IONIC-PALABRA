import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  public juegoGanadoSubject = new Subject<void>();
   juegoGanado$ = this.juegoGanadoSubject.asObservable();

   notificarJuego(){
    this.juegoGanadoSubject.next();
   }

  constructor(public http: HttpClient) { } 

  juegoGanado(tiempo: number) {
    // Lógica para cuando se gana el juego
    this.guardarRecord(tiempo);
  }

  juegoPerdido() {
    // Lógica para cuando se pierde el juego
    this.guardarRecord(0); // Puedes pasar 0 como tiempo si quieres registrar un récord cuando se pierde el juego
  }

  private guardarRecord(tiempo: number) {
    const record = {
      user_id: 1, // Reemplaza con el ID del usuario si estás autenticando usuarios
      tiempo: tiempo
    };
      
    this.http.post('http://127.0.0.1:8000/api/records', record)
      .subscribe(response => {
        console.log('Record guardado exitosamente');
      }, error => {
        console.error('Error al guardar el record:', error);
      });
  }

  enviarIntentos(intentos: any[]) {
    // Reemplaza la URL con la URL de tu API de Laravel
    return this.http.post('http://127.0.0.1:8000/api/records', intentos);
  }

}
