import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistroComponent} from './componentes/registro/registro.component';
import {CatalogoGeneralComponent} from './componentes/catalogo-general/ catalogo-general.component';



const routes: Routes = [
  {
    path: '',
    children: [
      // { path: '', redirectTo: '/apps', pathMatch: 'full' },
      { path: '', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
      { path: 'registro', component: RegistroComponent },
      { path: '', redirectTo: '/registro', pathMatch: 'full' },
      { path: 'catalogo', component: CatalogoGeneralComponent }


    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
