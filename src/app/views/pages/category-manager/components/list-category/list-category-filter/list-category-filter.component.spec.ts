import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryFilterComponent } from './list-category-filter.component';

describe('ListCategoryFilterComponent', () => {
  let component: ListCategoryFilterComponent;
  let fixture: ComponentFixture<ListCategoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCategoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
