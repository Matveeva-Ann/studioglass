import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { AuthAdminRoutingModule } from './auth-admin-routing';
import { AuthAdminComponent } from './auth-admin.component';

@NgModule({
  declarations: [
    AuthAdminComponent,
  ],
  imports: [
    CommonModule,
    AuthAdminRoutingModule,
    SharedModule,
  ],
})
export class AuthAdminModule { }
