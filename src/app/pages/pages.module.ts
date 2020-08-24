import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    PerfilComponent,
    NuevoUsuarioComponent,
    ListaUsuariosComponent,
    ChangePassComponent,
    AddClienteComponent,
    ListaClientesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports: [
    PagesComponent,
    HomeComponent
  ]
})
export class PagesModule { }
