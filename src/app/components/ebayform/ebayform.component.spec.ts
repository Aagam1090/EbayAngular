import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbayformComponent } from './ebayform.component';

describe('EbayformComponent', () => {
  let component: EbayformComponent;
  let fixture: ComponentFixture<EbayformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EbayformComponent]
    });
    fixture = TestBed.createComponent(EbayformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
