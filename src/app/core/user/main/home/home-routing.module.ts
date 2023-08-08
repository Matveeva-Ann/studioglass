import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsCollectionComponent } from './goods-collection/goods-collection.component';
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'collection', component: GoodsCollectionComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
