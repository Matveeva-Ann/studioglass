import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home.component';
import { SloganComponent } from './slogan/slogan.component';
import { ArticleAboutusComponent } from './article-aboutus/article-aboutus.component';
import { GoodsCollectionComponent } from './goods-collection/goods-collection.component';
import { ArticleShowerBoxesComponent } from './article-shower-boxes/article-shower-boxes.component';
import { BestOffersComponent } from './best-offers/best-offers.component';;
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    HeroComponent,
    HomeComponent,
    SloganComponent,
    ArticleAboutusComponent,
    GoodsCollectionComponent,
    ArticleShowerBoxesComponent,
    BestOffersComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule { }
