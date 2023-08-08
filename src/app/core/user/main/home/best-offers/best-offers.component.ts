import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();
import Swiper from 'swiper';


@Component({
  selector: 'app-best-offers',
  templateUrl: './best-offers.component.html',
  styleUrls: ['./best-offers.component.scss'],
})
export class BestOffersComponent {

  @ViewChild('swiper')
  swiperRef!: ElementRef;
  swiper?: Swiper;

  ngAfterViewInit () {
    this.initSwiper();
  }
  ngOnInit(): void {
    this.reflections();
  }

  initSwiper() {
    this.swiper = new Swiper(this.swiperRef.nativeElement, {
      slidesPerView: this.numberReflections,
      spaceBetween: 10,
      loop: true,
    });
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  public numberReflections = 4;

  @HostListener('window:resize', ['$event'])

  reflections() {
    const screenWidth = window.innerWidth;
    this.numberReflections = screenWidth > 1200 ? 4 : screenWidth > 770 ? 3 : screenWidth > 570 ? 2 : 1;
    this.swiper?.update();
  }

  slides = [
    {
      img: '/assets/img/img1.webp',
      title: ' Скляні двері для душу FORCE color',
      price: 5,
    },
    {
      img: '/assets/img/img2.webp',
      title: 'Скляна душова кабіна CRISTAL color',
      price: 99955,
    },
    {
      img: '/assets/img/img3.webp',
      title: 'Скляна душова кабіна CRISTAL color',
      price: 7755,
    },
    {
      img: '/assets/img/img1.webp',
      title: ' Скляні двері для душу FORCE color',
      price: 5,
    },
    {
      img: '/assets/img/img2.webp',
      title: 'Скляна душова кабіна CRISTAL color',
      price: 99955,
    },
    {
      img: '/assets/img/img3.webp',
      title: 'Скляна душова кабіна CRISTAL color',
      price: 7755,
    },
    {
      img: '/assets/img/img1.webp',
      title: ' Скляні двері для душу FORCE color',
      price: 5,
    },
    {
      img: '/assets/img/img2.webp',
      title: 'Скляна душова кабіна CRISTAL color',
      price: 99955,
    },
    {
      img: '/assets/img/img3.webp',
      title: 'Скляна душова кабіна CRISTAL color',
      price: 7755,
    },
  ];

//   @ViewChild('swiperContainer') swiperContainer: any;

//  ngOnInit(): void {
//   this.initSwiper();
//  }

//   public initSwiper() {
//     const swiperEl = this.swiperContainer.nativeElement;
//     const Swiper = require('swiper').default;

//     new Swiper(swiperEl, {
//       // Ваші налаштування Swiper тут
//     });
//   }
}

