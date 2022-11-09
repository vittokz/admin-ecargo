import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBilleteraComponent } from './list-billetera.component';

describe('ListBilleteraComponent', () => {
  let component: ListBilleteraComponent;
  let fixture: ComponentFixture<ListBilleteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBilleteraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBilleteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
