import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'app-about-category',
  templateUrl: './about-category.component.html',
  styleUrls: ['./about-category.component.scss']
})
export class AboutCategoryComponent {

  constructor(
    private categoriesService: CategoriesService,
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  // getDescriptionCaregory(){
  //   this.categoriesService.
  // }
}
