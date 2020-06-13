import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { dienstKalenderComponent } from "./dienst-kalender.component";

describe("dienstKalenderComponent", () => {
  let component: dienstKalenderComponent;
  let fixture: ComponentFixture<dienstKalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [dienstKalenderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dienstKalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
