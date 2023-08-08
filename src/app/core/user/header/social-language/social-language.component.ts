import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-language',
  templateUrl: './social-language.component.html',
  styleUrls: ['./social-language.component.scss']
})
export class SocialLanguageComponent {
  @Input() isProductPage!: boolean;

}
