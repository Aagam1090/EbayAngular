import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbayFormComponent } from './ebay-form.component';

describe('EbayFormComponent', () => {
  let component: EbayFormComponent;
  let fixture: ComponentFixture<EbayFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EbayFormComponent]
    });
    fixture = TestBed.createComponent(EbayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
