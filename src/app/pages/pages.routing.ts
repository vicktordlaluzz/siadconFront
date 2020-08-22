import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {

        path: 'dashboard',
        component: PagesComponent, canActivate:[AuthGuard],
        children: [
            { path: '', component: HomeComponent},
            { path: 'usuario/perfil', component: PerfilComponent},
            { path: 'administrador/nuevoUsuario', component: NuevoUsuarioComponent},
            { path: 'administrador/listaUsuarios', component: ListaUsuariosComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
