import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  addProduct$: Subject<void> = new Subject<void>();

  constructor() { }
}
