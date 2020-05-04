import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessLevelManagerComponent } from './access-level-manager.component';

describe('AccessLevelManagerComponent', () => {
  let component: AccessLevelManagerComponent;
  let fixture: ComponentFixture<AccessLevelManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessLevelManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessLevelManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
