import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusChauffeurToevoegenComponent } from "./bus-chauffeur-toevoegen.component";

describe("BusChauffeurToevoegenComponent", () => {
  let component: BusChauffeurToevoegenComponent;
  let fixture: ComponentFixture<BusChauffeurToevoegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusChauffeurToevoegenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusChauffeurToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
