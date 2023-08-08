import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsCollectionComponent } from './goods-collection.component';

describe('GoodsCollectionComponent', () => {
  let component: GoodsCollectionComponent;
  let fixture: ComponentFixture<GoodsCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
