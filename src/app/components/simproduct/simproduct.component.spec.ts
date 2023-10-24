import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimproductComponent } from './simproduct.component';

describe('SimproductComponent', () => {
  let component: SimproductComponent;
  let fixture: ComponentFixture<SimproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimproductComponent]
    });
    fixture = TestBed.createComponent(SimproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
