import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { CallComponent } from './call/call.component';
import { CategoryComponent } from './category/category.component';
import { GoodsComponent } from './goods/goods.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path:'', component: AdminComponent, children:[
    {path: 'goods', component:GoodsComponent},
    {path: 'order', component:OrderComponent},
    {path: 'category', component:CategoryComponent},
    {path: 'callBack', component: CallComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }