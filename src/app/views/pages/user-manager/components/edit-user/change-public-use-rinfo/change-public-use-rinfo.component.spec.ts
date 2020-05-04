import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePublicUseRInfoComponent } from './change-public-use-rinfo.component';

describe('ChangePublicUseRInfoComponent', () => {
  let component: ChangePublicUseRInfoComponent;
  let fixture: ComponentFixture<ChangePublicUseRInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePublicUseRInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePublicUseRInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
