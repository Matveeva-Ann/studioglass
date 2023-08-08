import { Injectable } from '@angular/core';
import { IUserDataRequest, IUserDataResponse } from '../../interface/user-data-interfase';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private afs: Firestore,
  ) { }

  updateUserData(userData:any, id:string){
    const goodDocRef = doc(this.afs, `Users/${id}`);
    return updateDoc(goodDocRef, { ...userData });
  }
}
