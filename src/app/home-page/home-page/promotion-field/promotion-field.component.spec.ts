import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionFieldComponent } from './promotion-field.component';

describe('PromotionFieldComponent', () => {
  let component: PromotionFieldComponent;
  let fixture: ComponentFixture<PromotionFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromotionFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
