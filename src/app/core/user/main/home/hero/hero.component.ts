import { Component, ElementRef, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  swiperPaginationOptions = {
    clickable: true,
    type: 'bullets',
  };

  imgs = ['/assets/img/baner-10.jpg', '/assets/img/baner-shb_1.jpg']
  sliderInfo = [
    {
      img: '/assets/img/baner-10.jpg',
      btnName: 'Дзеркала з LED підсвіткою',
      name: 'Led Mirrors',
      path: 'led-mirror',
    },
    {
      img: '/assets/img/baner-shb_1.jpg',
      btnName: 'Душові кабіни, шторки у ванну та перегородки для душу',
      name: 'Shower Boxes',
      path: 'dushovi-kabini',
    }
  ]
  
}
