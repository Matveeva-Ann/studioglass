import { Component } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interface/category-interface';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent {
  public categoriesArr: ICategoryResponse[] = [];


  constructor(
    private categoriesService: CategoriesService,
  ){}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.categoriesService.getCategory().subscribe((data) =>{
      this.categoriesArr = data as ICategoryResponse[];
    })
  }

  edit(category:ICategoryResponse){

  }

  delete(category:ICategoryResponse){
    this.categoriesService.deleteCategory(category.id).then(() => {
      this.getAllCategories();
    });
  }
}
