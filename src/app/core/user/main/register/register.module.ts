import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component'; 
import { SharedModule } from 'src/app/shared/components/shared.module';

import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports:[
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
  ]
})

export class RegisterModule {}
