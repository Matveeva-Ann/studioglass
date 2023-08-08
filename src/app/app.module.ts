import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/user/footer/footer.component';

import { SharedModule } from './shared/components/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './core/user/header/header.module';
import { environment } from 'src/environments/environment';
import { ProductComponent } from './core/user/main/product/product.component';
import { BreadCrumbsComponent } from './core/user/main/product/bread-crumbs/bread-crumbs.component';
import { SortFilterComponent } from './core/user/main/product/sort-filter/sort-filter.component';
import { AllCategoryProductComponent } from './core/user/main/product/all-category-product/all-category-product.component';
import { ProductCardComponent } from './core/user/main/product/product-card/product-card.component';
import { AboutCategoryComponent } from './core/user/main/product/about-category/about-category.component';
import { OrderPageComponent } from './core/user/main/order-page/order-page.component';
import { ProductDetailComponent } from './core/user/main/product/product-detail/product-detail.component';
import { QuantityCounterComponent } from './core/user/main/product/product-detail/quantity-counter/quantity-counter.component';
// import { BasketProductComponent } from './core/user/main/basket-product/basket-product.component';
// import { BasketDialogComponent } from './core/user/main/basket-dialog/basket-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ProductComponent,
    BreadCrumbsComponent,
    SortFilterComponent,
    AllCategoryProductComponent,
    ProductCardComponent,
    AboutCategoryComponent,
    OrderPageComponent,
    ProductDetailComponent,
    QuantityCounterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HeaderModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
