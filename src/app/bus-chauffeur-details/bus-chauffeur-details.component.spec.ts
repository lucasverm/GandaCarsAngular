import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusChauffeurDetailsComponent } from "./bus-chauffeur-details.component";

describe("BusChauffeurDetailsComponent", () => {
  let component: BusChauffeurDetailsComponent;
  let fixture: ComponentFixture<BusChauffeurDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusChauffeurDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusChauffeurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
