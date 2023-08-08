import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-quantity-counter',
  templateUrl: './quantity-counter.component.html',
  styleUrls: ['./quantity-counter.component.scss'],
})
export class QuantityCounterComponent {
  @Input() size!: number;
  @Input() name!: string;

  @Output() newSize = new EventEmitter();

  reduce() {
    if(this.size > 0){
      this.size--;
    }
  }

  increase() {
    this.size++;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['size']){
      this.newSize.emit(this.size);
    }
  }
}
