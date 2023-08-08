import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CallDialogComponent } from 'src/app/shared/components/call-dialog/call-dialog.component';
import { ICategoryResponse } from 'src/app/shared/interface/category-interface';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() closeThisWindow = new EventEmitter<any>();

  public categoriesArr: ICategoryResponse[] = []
  public openModalWindow = false;

  openDialog(){
    this.openModalWindow = true;
  }
  closeWindow(event: boolean){
    this.openModalWindow = false;
  }


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

  close(){
    this.closeThisWindow.emit();
  }
}
