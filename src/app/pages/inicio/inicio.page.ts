import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public nivel: number = 0
  public jugador: string = ''
  public opciones: any[] =[
    {id: 1, name:'Fácil', color: 'primary'},
    {id: 2, name:'Normal', color: 'warning'},
    {id: 3, name:'Difícil', color: 'danger'},
  ]
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    return 0
  }
  onSelectNivel(id: number){
    this.router.navigate(['/jugar', id])
  }

}
