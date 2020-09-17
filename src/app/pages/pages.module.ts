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
import { BusquedaClientePipe } from '../pipes/busqueda-cliente.pipe';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';
import { SerachDocPipe } from '../pipes/serach-doc.pipe';
import { NewTramiteComponent } from './new-tramite/new-tramite.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TramiteslistComponent } from './tramiteslist/tramiteslist.component';
import { SearchTramitesPipe } from '../pipes/search-tramites.pipe';
import { TramiteDetailComponent } from './tramite-detail/tramite-detail.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    PerfilComponent,
    NuevoUsuarioComponent,
    ListaUsuariosComponent,
    ChangePassComponent,
    AddClienteComponent,
    ListaClientesComponent,
    BusquedaClientePipe,
    SerachDocPipe,
    SearchTramitesPipe,
    DetalleClienteComponent,
    NewTramiteComponent,
    TramiteslistComponent,
    TramiteDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  exports: [
    PagesComponent,
    HomeComponent
  ]
})
export class PagesModule { }
