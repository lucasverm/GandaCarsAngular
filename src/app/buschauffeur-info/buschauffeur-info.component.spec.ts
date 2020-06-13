import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BuschauffeurInfoComponent } from "./buschauffeur-info.component";

describe("BuschauffeurInfoComponent", () => {
  let component: BuschauffeurInfoComponent;
  let fixture: ComponentFixture<BuschauffeurInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuschauffeurInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuschauffeurInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
