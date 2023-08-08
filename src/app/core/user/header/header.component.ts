import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isProductPage!: boolean;
  @Input() adminPage!: boolean;

  public showMenu = false;
  public notAdminPanel = true;
  public basketDialogIsOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  closeThisWindow() {
    this.showMenu = false;
  }
  basketOpen(){
    this.basketDialogIsOpen = !this.basketDialogIsOpen;
  }
  closeBasketDialog(){
    this.basketDialogIsOpen = false;
  }
  
  transitionTO() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    switch (currentUser?.role) {
      case 'USER':
        this.router.navigate(['/userPage/userData']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin/goods']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}
