import { Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interface/category-interface';
import { register } from 'swiper/element/bundle';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
register();
import Swiper from 'swiper';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  swiperPaginationOptions = {
    clickable: true,
    type: 'bullets',
  };
  loop = true;

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
    },
  ];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loadSliderData();
  }

  ngDoCheck(): void {
    this.swiperPaginationOptions = {
      clickable: true,
      type: 'bullets',
    };
  }

  loadSliderData() {
    this.categoriesService.getCategory().subscribe((data) => {
      let dataArr = data as ICategoryResponse[];
      const filteredData = dataArr.filter(
        (elem) =>
          elem.banner &&
          elem.name !== 'Shower Boxes' &&
          elem.name !== 'Led Mirrors'
      );
      console.log(filteredData)
      if (filteredData.length > 0) {
        const newSlides = filteredData.map((elem) => ({
          img: elem.banner,
          btnName: elem.nameBth,
          name: elem.name,
          path: elem.path,
        }));
        this.sliderInfo.push(...newSlides);
      }
    });
  }
}
