import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusChauffeurOverzichtComponent } from './bus-chauffeur-overzicht.component';

describe('BusChauffeurOverzichtComponent', () => {
  let component: BusChauffeurOverzichtComponent;
  let fixture: ComponentFixture<BusChauffeurOverzichtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusChauffeurOverzichtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusChauffeurOverzichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
