import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusChauffeurWijzigenComponent } from "./bus-chauffeur-wijzigen.component";

describe("BusChauffeurWijzigenComponent", () => {
  let component: BusChauffeurWijzigenComponent;
  let fixture: ComponentFixture<BusChauffeurWijzigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusChauffeurWijzigenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusChauffeurWijzigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
