import { Component } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interface/category-interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  public openForm = false;
  public editCategory!: ICategoryResponse | undefined;

  toggleForm(){
    this.openForm = !this.openForm;
  }

  editCategoryClick(category: ICategoryResponse){
    this.editCategory = category;
    this.openForm = true;
  }

  categoryHasBeenEdited(){
    this.editCategory = undefined;
    this.openForm = false;
  }

}
