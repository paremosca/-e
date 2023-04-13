import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartiturasComponent } from './list-partituras.component';

describe('ListPartiturasComponent', () => {
  let component: ListPartiturasComponent;
  let fixture: ComponentFixture<ListPartiturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPartiturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPartiturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
