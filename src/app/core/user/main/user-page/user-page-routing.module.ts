import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserPageComponent } from './user-page.component';


const routes: Routes = [
  {path:'', component: UserPageComponent, children:[
    {path: 'userData', component:UserDataComponent},
    {path: 'orderHistory', component:OrderHistoryComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }