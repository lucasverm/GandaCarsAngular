import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DienstWijzigenComponent } from './dienst-wijzigen.component';

describe('DienstWijzigenComponent', () => {
  let component: DienstWijzigenComponent;
  let fixture: ComponentFixture<DienstWijzigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DienstWijzigenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DienstWijzigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
