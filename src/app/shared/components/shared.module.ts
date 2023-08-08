import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from './btn/btn.component';
import { RouterModule } from '@angular/router';
import { BtnLinkComponent } from './btn-link/btn-link.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CallDialogComponent } from './call-dialog/call-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { BasketProductComponent } from 'src/app/core/user/main/basket-product/basket-product.component';

const MATERIAL = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule,
  MatPseudoCheckboxModule,
];

@NgModule({
  declarations: [
    BtnComponent, 
    BtnLinkComponent, 
    CallDialogComponent,
    BasketProductComponent,
  ],
  exports: [
    BtnComponent,
    BtnLinkComponent,
    FormsModule,
    ReactiveFormsModule,
    CallDialogComponent,
    BasketProductComponent,
    ...MATERIAL,
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule,
    ...MATERIAL
  ],
})
export class SharedModule {}

// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// import { ModalWindowComponent } from "./components/modal-window/modal-window.component";
// import { CarouselModule } from "ngx-owl-carousel-o";
// import { SushiNavigationComponent } from "../pages/home/sushi-navigation/sushi-navigation.component";
// import { ControlsComponent } from "./components/controls/controls.component";
// import { BreadCrumbsComponent } from "./components/bread-crumbs/bread-crumbs.component";

// const otherModules = [
//   FormsModule,
//   ReactiveFormsModule,
//   CarouselModule,
// ]

// @NgModule({
//   declarations: [
//     ModalWindowComponent,
//     SushiNavigationComponent,
//     ControlsComponent,
//     BreadCrumbsComponent
//   ],
//   exports: [
//     ...MATERIAL,
//     ...otherModules,
//     ModalWindowComponent,
//     SushiNavigationComponent,
//     ControlsComponent,
//     BreadCrumbsComponent,
//   ],
//   imports: [
//     ...MATERIAL,
//     ...otherModules,
//     CommonModule,
//     RouterModule,
//     ToastrModule.forRoot(),
//   ],
//   providers: [
//     {provide: MAT_DATE_LOCALE, useValue: 'uk-UA'}
//   ]

// })

// export class SharedModule {}
