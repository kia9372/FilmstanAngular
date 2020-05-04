import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestActivationCodeComponent } from './request-activation-code.component';

describe('RequestActivationCodeComponent', () => {
  let component: RequestActivationCodeComponent;
  let fixture: ComponentFixture<RequestActivationCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestActivationCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestActivationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
