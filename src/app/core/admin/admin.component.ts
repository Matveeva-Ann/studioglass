import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  @Output() adminPanel = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.adminPanel.emit(true); 
  }
}
