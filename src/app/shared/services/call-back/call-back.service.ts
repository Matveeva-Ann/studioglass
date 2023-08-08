import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, DocumentData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CallBackService {
  private phoneCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore,
  ) 
  { this.phoneCollection = collection(this.afs, 'callBack'); }

  sendPhoneNumber(userData: Object){
    return addDoc(this.phoneCollection, userData);
  }

  getPhoneData(){
    return collectionData(this.phoneCollection, { idField: 'id' });
  }

  deletePhoneData(id: string) {
    const categoryDocRef = doc(this.afs, `callBack/${id}`);
    return deleteDoc(categoryDocRef);
  }

}
