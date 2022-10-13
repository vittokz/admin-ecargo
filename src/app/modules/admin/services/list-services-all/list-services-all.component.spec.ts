import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServicesAllComponent } from './list-services-all.component';

describe('ListServicesAllComponent', () => {
  let component: ListServicesAllComponent;
  let fixture: ComponentFixture<ListServicesAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListServicesAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListServicesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
