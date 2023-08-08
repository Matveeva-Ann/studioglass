import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  public openForm = false;

  toggleForm(){
    this.openForm = !this.openForm;
    console.log( this.openForm)
  }
}
