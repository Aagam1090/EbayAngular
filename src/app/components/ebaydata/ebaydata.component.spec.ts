import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbaydataComponent } from './ebaydata.component';

describe('EbaydataComponent', () => {
  let component: EbaydataComponent;
  let fixture: ComponentFixture<EbaydataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EbaydataComponent]
    });
    fixture = TestBed.createComponent(EbaydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
