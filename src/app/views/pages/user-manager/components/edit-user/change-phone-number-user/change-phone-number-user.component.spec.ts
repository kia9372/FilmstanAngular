import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhoneNumberUserComponent } from './change-phone-number-user.component';

describe('ChangePhoneNumberUserComponent', () => {
  let component: ChangePhoneNumberUserComponent;
  let fixture: ComponentFixture<ChangePhoneNumberUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhoneNumberUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhoneNumberUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
