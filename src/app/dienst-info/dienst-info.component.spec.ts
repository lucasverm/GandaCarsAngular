import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DienstInfoComponent } from './dienst-info.component';

describe('DienstInfoComponent', () => {
  let component: DienstInfoComponent;
  let fixture: ComponentFixture<DienstInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DienstInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DienstInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
