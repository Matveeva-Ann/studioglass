import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLanguageComponent } from './social-language.component';

describe('SocialLanguageComponent', () => {
  let component: SocialLanguageComponent;
  let fixture: ComponentFixture<SocialLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialLanguageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
