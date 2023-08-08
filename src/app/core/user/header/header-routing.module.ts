import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path:'oferta',
    loadChildren: () => import('../main/oferta/oferta.module').then(m => m.OfertaModule)
  },
  {
    path:'login',
    loadChildren: () => import('../main/login/login.module').then(m => m.LoginModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  HeaderRoutingModule { }
