import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IGoodsRequest } from 'src/app/shared/interface/goods-interface';
import { AddProductService } from 'src/app/shared/services/subjects/add-product/add-product.service';
import { LocalStorageSubjectService } from 'src/app/shared/services/subjects/local-storage-subject/local-storage-subject.service';

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
  public emptyBasket = false;
  public amountProduct = 0;

  constructor(
    private router: Router,
    private addProductService: AddProductService,
    private localStorageSubject: LocalStorageSubjectService
    ) {}

  ngOnInit(): void {
    this.calculationQuantity();
    this.localStorageSubject.localStorage$.subscribe(()=> {
      this.calculationQuantity();
    })

    console.log('ссилка для адміна: /auth')
    console.log('логін адміна: admin@ukr.net')
    console.log('пароль адміна: 123123')
    console.log('логін юзера: nasty@ukr.net')
    console.log('пароль юзера: 123123')

  }

  calculationQuantity(){
    if(localStorage.getItem('basket')){
      const sum: Array<IGoodsRequest> = JSON.parse(localStorage.getItem('basket') as string);
      this.amountProduct = sum.reduce((accum, elem) => accum + elem.count, 0);
    }else{
      this.amountProduct = 0;
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  closeThisWindow() {
    this.showMenu = false;
  }
  basketOpen(){
    if (this.amountProduct > 0) {
      this.basketDialogIsOpen = !this.basketDialogIsOpen;
    } else {
      this.emptyBasket = !this.emptyBasket;
    }
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
