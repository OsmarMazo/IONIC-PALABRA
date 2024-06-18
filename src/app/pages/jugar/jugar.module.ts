import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JugarPageRoutingModule } from './jugar-routing.module';

import { JugarPage } from './jugar.page';
import { FilaComponent } from 'src/app/components/fila/fila.component';
import { CeldaComponent } from 'src/app/components/celda/celda.component';
import { InputPComponent } from 'src/app/components/input-p/input-p.component';
import { JuegoService } from 'src/app/services/juego.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JugarPageRoutingModule
  ],
  declarations: [JugarPage, FilaComponent, CeldaComponent, InputPComponent ]
})
export class JugarPageModule {}
