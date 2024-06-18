import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { JuegoService } from 'src/app/services/juego.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-input-p',
  templateUrl: './input-p.component.html',
  styleUrls: ['./input-p.component.scss'],
})
export class InputPComponent  implements OnInit {
  //public ingresar:string='' /*variable. guardar las palabras ingresadas */
    ingresar:string=''; /*variable. guardar las palabras ingresadas */
    juegoGanado= false;
    tiempoLimite = 60; // Definir el tiempo límite en segundos
    @Output() even = new EventEmitter
  constructor(
    ///public router:Router
    public navCtrl: NavController ,
    public router: Router,
    public juegoService: JuegoService,
    public timerService: TimerService
    
  ) {
        this.juegoService.juegoGanado$.subscribe(() => {
          this.juegoGanado =true;
          this.timerService.detenerTiempo(); // Detener el temporizador cuando se gane el juego

        });

   }

  
  ngOnInit() {

    return 0
  }

      enviarPalabra() {       
        if (!this.juegoGanado && this.ingresar && this.ingresar.split('').length  ===5){          
          //this.router.navigate(['/judar', {id: this.ingresar} ]);
          this.even.emit(this.ingresar)
          this.timerService.iniciarTiempo(this.tiempoLimite, () => {
            // Función de juego perdido cuando se excede el tiempo límite
            console.log('¡Juego perdido! Se excedió el tiempo límite.');
            // Aquí puedes agregar la lógica adicional para el juego perdido
          });
        }
      }

      
      

}
