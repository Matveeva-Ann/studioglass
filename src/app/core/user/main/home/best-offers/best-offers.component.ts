import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';

import Swiper from 'swiper';
register();

@Component({
  selector: 'app-best-offers',
  templateUrl: './best-offers.component.html',
  styleUrls: ['./best-offers.component.scss'],
})
export class BestOffersComponent {

  @ViewChild('swiper')
  swiperRef!: ElementRef;
  swiper?: Swiper;
  slides: Array<IGoodsResponse> = [];
  swiperPaginationOptions = {
    clickable: true,
    type: 'bullets',
  };
  constructor(
    private goodsService:GoodsService,
  ){}

  ngOnInit(): void {
    this.reflections();
    this.getGoods();
  }

  getGoods(){
    this.goodsService.getGoods().subscribe((data)=>{
      const allGoods = data as IGoodsResponse[];
      const index = allGoods.length - 10;
      this.slides = allGoods.slice(index);
    })
  }

  ngDoCheck(): void {
    this.swiperPaginationOptions = {
      clickable: true,
      type: 'bullets',
    };
  }
  
  public numberReflections = 4;

  @HostListener('window:resize', ['$event'])

  reflections() {
    const screenWidth = window.innerWidth;
    this.numberReflections = screenWidth > 1200 ? 4 : screenWidth > 770 ? 3 : screenWidth > 570 ? 2 : 1;
    this.swiper?.update();
  }

}

