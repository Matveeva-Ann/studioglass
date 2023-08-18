import { Component } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interface/category-interface';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'app-goods-collection',
  templateUrl: './goods-collection.component.html',
  styleUrls: ['./goods-collection.component.scss']
})
export class GoodsCollectionComponent {
  public categoriesArr: ICategoryResponse[] = []

  constructor(
    private categoriesService:CategoriesService
  ){}

  ngOnInit(): void {
   this.getAllCategories();
  }

  getAllCategories(){
    this.categoriesService.getCategory().subscribe((data) =>{
      this.categoriesArr = data as ICategoryResponse[];
    })
  }
}
