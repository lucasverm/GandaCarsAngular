import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DienstOverzichtComponent } from './dienst-overzicht.component';

describe('DienstOverzichtComponent', () => {
  let component: DienstOverzichtComponent;
  let fixture: ComponentFixture<DienstOverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DienstOverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DienstOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
