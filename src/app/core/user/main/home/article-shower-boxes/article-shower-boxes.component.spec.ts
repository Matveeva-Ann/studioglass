import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleShowerBoxesComponent } from './article-shower-boxes.component';

describe('ArticleShowerBoxesComponent', () => {
  let component: ArticleShowerBoxesComponent;
  let fixture: ComponentFixture<ArticleShowerBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleShowerBoxesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleShowerBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
