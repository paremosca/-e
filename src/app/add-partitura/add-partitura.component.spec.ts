import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartituraComponent } from './add-partitura.component';

describe('AddPartituraComponent', () => {
  let component: AddPartituraComponent;
  let fixture: ComponentFixture<AddPartituraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartituraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
