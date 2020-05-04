import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserSettingComponent } from './register-user-setting.component';

describe('RegisterUserSettingComponent', () => {
  let component: RegisterUserSettingComponent;
  let fixture: ComponentFixture<RegisterUserSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUserSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
