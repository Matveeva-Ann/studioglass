import { Injectable } from '@angular/core';
import { collection, DocumentData, where } from '@firebase/firestore';
import { addDoc, collectionData, CollectionReference, deleteDoc, doc, docData, Firestore, query, updateDoc,  } from '@angular/fire/firestore';
import { ICategoryRequest } from '../../interface/category-interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoryCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore,
    ) { 
    this.categoryCollection = collection(this.afs, 'categories');
  }

  addCategory(category: ICategoryRequest){
    return addDoc(this.categoryCollection, category);
  }

  getCategory(){
    return collectionData(this.categoryCollection, { idField: 'id' });
  }

  deleteCategory(id:string){
    const categoryDocRef = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocRef);
  }
}
