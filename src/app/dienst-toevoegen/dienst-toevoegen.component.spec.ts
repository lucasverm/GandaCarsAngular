import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DienstToevoegenComponent } from "./dienst-toevoegen.component";

describe("DienstToevoegenComponent", () => {
  let component: DienstToevoegenComponent;
  let fixture: ComponentFixture<DienstToevoegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DienstToevoegenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DienstToevoegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
