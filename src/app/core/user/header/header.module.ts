import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/components/shared.module';

import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header.component';
import { SocialLanguageComponent } from './social-language/social-language.component';
import { HeaderRoutingModule } from './header-routing.module';
import { BlurOnScrollDirective } from './blur-on-scroll.directive';
import { BasketDialogComponent } from '../main/basket-dialog/basket-dialog.component';


@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    SocialLanguageComponent,
    BlurOnScrollDirective,
    BasketDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeaderRoutingModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule { }
