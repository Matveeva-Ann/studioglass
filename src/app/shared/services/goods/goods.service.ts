import { Injectable } from '@angular/core';
import { IGoodsRequest } from '../../interface/goods-interface';
import { collection, DocumentData, where } from '@firebase/firestore';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, query, updateDoc,  } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  private goodsCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
    ) { 
    this.goodsCollection = collection(this.afs, 'products');
  }

  addGoods(goods: IGoodsRequest){
    return addDoc(this.goodsCollection, goods);
  }

  getGoods(){
    return collectionData(this.goodsCollection, { idField: 'id' });
  }

  deleteGoods(id:string){
    const goodDocRef = doc(this.afs, `products/${id}`);
    return deleteDoc(goodDocRef);
  }

  getGoodsByCategory (categoryPath: string){
    const goodsCollectionRef: CollectionReference = collection(this.afs, 'products');
    const queryRef = query(goodsCollectionRef, where('path', '==', categoryPath));
    return collectionData(queryRef, { idField: 'id' });
  }
  
  getOneGood(id: any){
    const goodDocRef = doc(this.afs, `products/${id}`);
    return docData(goodDocRef, {idField: 'id'})
  }






  updateGoods(goods:IGoodsRequest, id:string){
    const goodDocRef = doc(this.afs, `products/${id}`);
    return updateDoc(goodDocRef, { ...goods });
  }






}

