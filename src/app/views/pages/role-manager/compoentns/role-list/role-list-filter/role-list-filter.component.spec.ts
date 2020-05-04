import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleListFilterComponent } from './role-list-filter.component';

describe('RoleListFilterComponent', () => {
  let component: RoleListFilterComponent;
  let fixture: ComponentFixture<RoleListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
