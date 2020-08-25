import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AuthGuard } from '../guards/auth.guard';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';

const routes: Routes = [
    {

        path: 'dashboard',
        component: PagesComponent, canActivate:[AuthGuard],
        children: [
            { path: '', component: HomeComponent},
            { path: 'usuario/perfil', component: PerfilComponent},
            { path: 'usuario/cambiarPass', component: ChangePassComponent},
            { path: 'administrador/nuevoUsuario', component: NuevoUsuarioComponent},
            { path: 'administrador/listaUsuarios', component: ListaUsuariosComponent},
            { path: 'clientes/alta', component: AddClienteComponent},
            { path: 'clientes/expedientes', component: ListaClientesComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
