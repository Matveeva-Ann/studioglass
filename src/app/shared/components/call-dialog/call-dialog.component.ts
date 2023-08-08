import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallBackService } from '../../services/call-back/call-back.service';

@Component({
  selector: 'app-call-dialog',
  templateUrl: './call-dialog.component.html',
  styleUrls: ['./call-dialog.component.scss'],
})
export class CallDialogComponent {
  @Output() close = new EventEmitter<boolean>();

  public willCallForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private callBackService: CallBackService,
    ) {}

  ngOnInit(): void {
    this.initForm();
  }

  closeWindow() {
    this.close.emit(true);
  }
  stopPropagation(event: Event): void {
    event?.stopPropagation();
  }

  initForm() {
    this.willCallForm = this.fb.group({
      name: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    });
  }

  public sendPhoneNumber() {
    console.log(this.willCallForm.value)
    this.callBackService.sendPhoneNumber(this.willCallForm.value).then();
    this.willCallForm.reset();
    this.closeWindow();
  }
}
