
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { GoodsComponent } from './goods/goods.component';
import { GoodsTableComponent } from './goods/goods-table/goods-table.component';
import { GoodsFormComponent } from './goods/goods-form/goods-form.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { CategoryTableComponent } from './category/category-table/category-table.component';
import { CallComponent } from './call/call.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavComponent,
    GoodsComponent,
    GoodsTableComponent,
    GoodsFormComponent,
    OrderComponent,
    CategoryComponent,
    CategoryFormComponent,
    CategoryTableComponent,
    CallComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
})
export class AdminModule { }
