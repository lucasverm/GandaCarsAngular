import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EffectieveWeekWijzigenComponent } from "./effectieve-week-wijzigen.component";

describe("EffectieveWeekWijzigenComponent", () => {
  let component: EffectieveWeekWijzigenComponent;
  let fixture: ComponentFixture<EffectieveWeekWijzigenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EffectieveWeekWijzigenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectieveWeekWijzigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
