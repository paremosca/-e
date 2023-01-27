import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartituresComponent } from './partitures.component';

describe('PartituresComponent', () => {
  let component: PartituresComponent;
  let fixture: ComponentFixture<PartituresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartituresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
