import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageSubjectService {

  localStorage$: Subject<void> = new Subject<void>();

  constructor() { }
}
