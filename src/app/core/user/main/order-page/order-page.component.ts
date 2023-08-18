import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';
import { IOrderRequest } from 'src/app/shared/interface/orders-interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { LocalStorageSubjectService } from 'src/app/shared/services/subjects/local-storage-subject/local-storage-subject.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent {
  public orderPrice = 0;
  public quantityGoods = 0;
  public orderForm!: FormGroup;
  private subscription!: Subscription;

  numbersNP = [ '№1 вулиця Городоцька, 359 ', '№2 вулиця Дмитра Данилишина, 6', '№3 вул. Угорська, 22', '№4 Трускавецька, 15' , '№5 вул. Данилишина, 6' ,' №8 вул. Грінченка, 2а' ,' №9 вул. Героїв УПА, 6' ];

  constructor(
    private fb: FormBuilder,
    private localStorageSubjectService: LocalStorageSubjectService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private orderService: OrderService,
  ){}

  ngOnInit(): void {
    this.countSum();
    this.initForm();

    this.subscription = this.localStorageSubjectService.localStorage$.subscribe(() => {
      this.countSum();
    });
  }

  initForm(){
    const currentUser = JSON.parse( localStorage.getItem('currentUser') as string );
    this.orderForm = this.fb.group({
      name: [currentUser?.name, Validators.required],
      phoneNumber: [currentUser?.phoneNumber, Validators.required],
      email: [currentUser?.email, Validators.required],
      secondName: [currentUser?.secondName, Validators.required],
      methodDelivery: ['самовивіз'],
      pickUpAddress: ['Головний офіс'],
      userCity:[],
      userStreet: [],
      userHouse: [],
      userFlat:[],
      numberNP: ['відділення'],
      methodPay: ['готівка'],
      addComment: [''],
      orderNumber: 0,
    });


  }

  addOrder(){
    const orderProducts = JSON.parse(localStorage.getItem('basket') as string);

    const userDataOrder: IOrderRequest = {
      paymentMethod: this.orderForm.value['methodPay'],
      methodDelivery: this.orderForm.value['methodDelivery'],
      userName: this.orderForm.value['name'] + ' ' + this.orderForm.value['secondName'],
      phoneNumber: this.orderForm.value['phoneNumber'],
      userEmail: this.orderForm.value['email'],
      pickUpAddress: '',
      userComment: this.orderForm.value['addComment'],
      orderStatus: 'Нове',
      orderNumber: 0,
      orderProducts: orderProducts,
      priseProd: 0,
    }
    userDataOrder.orderNumber = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
    userDataOrder.priseProd = this.orderPrice;
    if(this.orderForm.value['methodDelivery'] === 'самовивіз'){
      userDataOrder.pickUpAddress = this.orderForm.value['pickUpAddress']
    } 
    else if (this.orderForm.value['methodDelivery'] === 'адресна доставка'){
      userDataOrder.pickUpAddress = `${this.orderForm.value['userCity']}, вул. ${this.orderForm.value['userStreet']}, буд.${this.orderForm.value['userHouse']}, кв.${this.orderForm.value['userFlat']}`;
    } else{
      userDataOrder.pickUpAddress = `Нова Пошта відділення ${this.orderForm.value['numberNP']}`
    }


    this.orderService.addOrders(userDataOrder).then(()=>{
      this.router.navigate(['/collection']);
      localStorage.removeItem('basket');
 
        this.localStorageSubjectService.localStorage$.next();
      
    });

  }

  totalPrice(event: number) {
    this.orderPrice = event;
  }
  amountProducts(event: number) {
    this.quantityGoods = event;
  }

  countSum() {
    const productsInBasket: Array<IGoodsResponse> = JSON.parse(
      localStorage.getItem('basket') as string
    );
    if(productsInBasket){
      this.quantityGoods =  productsInBasket.reduce((total, elem) => total + elem.count, 0);
      this.orderPrice = productsInBasket.reduce((total, elem) => total + elem.price * elem.count, 0);  
    }
  
    if(this.quantityGoods === 0){
      this.router.navigate(['/collection']);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();    
  }


}
