import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPageComponent } from './core/user/main/order-page/order-page.component';
import { PaymentDeliveryComponent } from './core/user/main/payment-delivery/payment-delivery.component';
import { ProductDetailComponent } from './core/user/main/product/product-detail/product-detail.component';
import { ProductComponent } from './core/user/main/product/product.component';
import { AuthAdminGuardGuard } from './shared/guards/AuthAdminGuard/auth-admin-guard.guard';
import { AuthUserPageGuardGuard } from './shared/guards/AuthUserPageGuard/auth-user-page-guard.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./core/user/main/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'userPage',
    canActivate: [AuthUserPageGuardGuard],
    loadChildren: () => import('./core/user/main/user-page/user-page.module').then(m => m.UserPageModule)
  },
  
  {
    path:'auth',
    loadChildren: () => import('./core/admin/auth-admin/auth-admin.module').then(m => m.AuthAdminModule)
  },
  {
    path:'register',
    loadChildren: () => import('./core/user/main/register/register.module').then(m => m.RegisterModule)
  },
  {
    path:'admin',
    canActivate: [AuthAdminGuardGuard],
    loadChildren: () => import('./core/admin/admin.module').then(m => m.AdminModule)
  },
  {path:'product/:category', component: ProductComponent},
  {path:'product/:category/:id', component: ProductDetailComponent},
  {path: 'order', component: OrderPageComponent },
  {path: 'oplata-ta-dostavka', component: PaymentDeliveryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
