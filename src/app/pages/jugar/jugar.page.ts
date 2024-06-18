import { Component, Input, OnInit, QueryList, ViewChildren, input, viewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { AlertController, NavController } from '@ionic/angular';
import { FilaComponent } from 'src/app/components/fila/fila.component';
import { JuegoService } from 'src/app/services/juego.service';
import { RecordService } from 'src/app/services/record.service';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {
  public id: number = 0
  public nivel: any = ''
  //@Input() ingresar: string=''
   ingresar: string ='';
  
   //intentos: Intento[] = [];
   public intentos: string [] = [];
   public intentoActual = 0;
  public esapalabra: string  = ''

  public opciones: any =[
    {id: 1, name:'Fácil', opc: 7, color: 'primary'},
    {id: 2, name:'Normal', opc: 5, color: 'warning'},
    {id: 3, name:'Difícil', opc: 2, color: 'danger'},
  ]
  @ViewChildren(FilaComponent) filaComponents!: QueryList<FilaComponent>;
    //Filas
  //public numfilas: number[] = [];
  public numfilas: any[] = [];
  public filasActivas: number = 0;

  public email:string='';
  public nombreJugador:string='';
  public broWon = false;
  public tiempoInicio: number = 0;
  public tiempoActual: number = 0;
  public intervalId: any;
  tiempo= {
    minutos: 0,
    segundos: 0,
    milisegundos: 0,
  };

  public palabras: string[] = [/*
    'acaba', 'dabas', 'dados', 'dalia', 'damas', 'dante',
    'hacen', 'hacer', 'hacha', 'zorra', 'viaje', 'viche'*/
  ]   //palabras obtenidas desde laravel
  public palabra: string = ''
  public letras: string[] = []   //letras ingresadas en la celda
  
  constructor(
    public activedRoute: ActivatedRoute,
    public timerService:TimerService, //llama el servicio timer.service
    //public navCtrl: NavController, //llama el controlador que envia la palabra ingresada desde el input presionando el boton comprobar
    public route:ActivatedRoute, // llama el texto ingresado en el componente input
    public juegoService: JuegoService,
    public alertController:AlertController,
    public router:Router,
    public recordService:RecordService,
  
  ) { 
    setTimeout(() => {
      this.tiempo = this.timerService.tiempo;
  }, 1000);
  }

    async ngOnInit() {
      this.id = this.activedRoute.snapshot.params['id']
      this.nivel = this.opciones.find((item: any) => item.id == this.id)
      this.numfilas = Array(this.nivel.opc).fill(0).map((x,i)=>i);
      console.log(this.numfilas);

      this.nombreJugador = this.activedRoute.snapshot.params['nombreJugador']
      const options = {
        url: 'http://127.0.0.1:8000/api/palabras',  //obtiene las palabras desde laravel
      };
      
      try{
      const response: HttpResponse = await CapacitorHttp.get(options);
      console.log('response', response.data);
      response.data.forEach((item: any) => {
        this.palabras.push(item.palabra) //llena el arreglo de palabras
       });
      }catch (error) {
        console.error('Error al obtener las palabras desde la base de datos', error);
      }
    

      
      const rand = Math.floor(Math.random()*this.palabras.length)
      this.palabra = this.palabras[rand]
      this.letras = this.palabra.split('')
      console.log(this.letras)

      this.iniciarCronometro();
  
    return 0
  }
        iniciarCronometro(){
        this.tiempoInicio =Date.now();
        this.intervalId = setInterval(() => {
          this.tiempoActual = Date.now() - this.tiempoInicio;
          }, 10); //Actualiza cada 10 ms
          }

          detenerCronometro(){
            clearInterval(this.intervalId);
          }
          guardarRecord(){
            const record = {
              nombreJugador: this.nombreJugador,
              email: this.email,
              nivelJuego : this.nivel,
              tiempo: this.tiempoActual,
            };

            this.recordService.createRecord(record).subscribe(
              response =>{
                console.log('Record Guardado:', response);
                this.router.navigate(['/']);  //Navegar hacia la pagina inicio después de guardar el record
              },
              error =>{
                  console.error('Error al guardar el record:', error);
              });
          }

          generarfilas(numeroFilas: number){
            for(let i=0; i < numeroFilas; i++){
              this.numfilas.push({activa: i===0 }); // La primera fila estará activa, las demás inactivas
            }
          }

          cambiarFilaActiva(index:number){
           // Cambiar la fila activa según el índice recibido
           this.numfilas.forEach((fila, i) => {
            fila.activa = i === index;
          });
        }

        async enviar(){
          this.filasActivas--; 
          if(this.filasActivas == 0){
            const alert = await this.alertController.create({  
              header:'¡Lo siento!',
              message: 'Ya agoto todos tus intentos.',
              buttons: [
                {
                  text:'Comprendo',
                  handler:() =>{
                    console.log('Boton de OK, Presionado');
                    this.router.navigate(['/']); // Redirige hacia la página de inicio
                  }
                }]
            });
            await alert.present();
          }
          const filasCompletas = this.numfilas.every(fila => fila.completa);
          console.log(filasCompletas);
          if(filasCompletas){
            }else{
              this.filaComponents.forEach(fila => {
                fila.verificarFilaCompleta();    //verificar en el componente fila si esta este metodo 
              });
            }
        }
        
       async onFilaCompleta(letras: string[]) {
          console.log('Intento recibido: ', letras);
          const resultado = this.generarResultado(letras, this.palabras);
          console.log('Resultado:', resultado);
          if (this.arraysAreEqual(resultado, ['verde', 'verde', 'verde', 'verde', 'verde'])) { //En caso de que el jugador gane
            console.log('¡Felicidades, has ganado!');
            this.broWon = true;
            this.detenerCronometro();
            this.guardarRecord();
            await this.mostrarMensajeFelicitacion();
          }
        }

        arraysAreEqual(arr1: string[], arr2: string[]): boolean {
          if (arr1.length !== arr2.length) {
            return false;
          }
          for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
              return false;
            }
          }
          return true;
        }
        
        async mostrarMensajeFelicitacion() {
          const alert = await this.alertController.create({
            header: '¡Felicidades!',
            message: '¡Ganastes!',
            buttons: [
              {
                text: '¡Excelente!',
                handler: () => {
                  console.log('Botón OK presionado');
                  this.router.navigate(['/']); // Navegar a la página de inicio
                }
              }]
          });
          await alert.present();
        }

        generarResultado(intentos: string[], letras: string[]): string[] {
          const resultado: string[] = [];
          // Crear una copia de la palabra objetivo para marcar letras ya usadas
          const objetivoUsado = letras.slice();
          // Primero, marcar todos los aciertos exactos
          intentos.forEach((letra, index) => {
            if (letra === letras[index]) {
              resultado[index] = 'verde';
              objetivoUsado[index] = ''; // Marcar esta letra como usada
            } else {
              resultado[index] = '';
            }
          });

              // Luego, marcar aciertos parciales (letras en la palabra pero en la posición incorrecta)
              intentos.forEach((letra, index) => {
                if (resultado[index] !== 'verde') {
                  const pos = objetivoUsado.indexOf(letra);
                  if (pos !== -1) {
                    resultado[index] = 'amarillo';
                    objetivoUsado[pos] = ''; // Marcar esta letra como usada
                  } else {
                    resultado[index] = 'rojo';
                  }
                }
              });
              return resultado;
            }

  onPalabra(texto: string){    
    this.esapalabra = texto
  }
        
}
