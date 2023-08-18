import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { IOrderRequest } from '../../interface/orders-interface';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public changeBasket = new Subject<boolean>;
  private orderCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.orderCollection = collection(this.afs, 'orders');
  }

  addOrders(order: IOrderRequest){
    return addDoc(this.orderCollection, order);
  }

  getOrders(){
    return collectionData(this.orderCollection, { idField: 'id' });
  }
  editOrder(order:IOrderRequest, id:string){
    const orderDocRef = doc(this.afs, `orders/${id}`);
    return updateDoc(orderDocRef, { ...order});
  }
 
  deleteOrder(id:string){
    const orderDocRef = doc(this.afs, `orders/${id}`);
    return deleteDoc(orderDocRef);
  }
}
