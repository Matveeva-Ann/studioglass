import { Component, Input } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interface/category-interface';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() isProductPage!: boolean;

  public categoriesArr: ICategoryResponse[] = []

  constructor(
    private categoriesService:CategoriesService,
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
