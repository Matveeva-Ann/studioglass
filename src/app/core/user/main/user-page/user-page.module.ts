import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/components/shared.module';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './user-page.component';
import { UserDataComponent } from './user-data/user-data.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    UserPageComponent,
    NavComponent,
    UserDataComponent,
    OrderHistoryComponent,
  ],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    SharedModule,
  ],
})
export class UserPageModule { }
