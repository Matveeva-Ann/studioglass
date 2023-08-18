import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategoryResponse } from 'src/app/shared/interface/category-interface';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'app-about-category',
  templateUrl: './about-category.component.html',
  styleUrls: ['./about-category.component.scss']
})
export class AboutCategoryComponent {
  public hasDescription = false;
  public text: Array<string> = [];
  constructor(
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.categoriesService.getCategory().subscribe((data)=>{
      const allCategories = data as ICategoryResponse[];
      allCategories.filter((elem) =>{
        if(elem.path === this.activatedRoute.snapshot.paramMap.get('category')){
          if (elem.description){
            this.hasDescription = true;
            this.text = elem.description.split('$');
          }
        }
      })
    })
    
  }
}
