import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FeestdagenAanpassenComponent } from "./feestdagen-aanpassen.component";

describe("FeestdagenAanpassenComponent", () => {
  let component: FeestdagenAanpassenComponent;
  let fixture: ComponentFixture<FeestdagenAanpassenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeestdagenAanpassenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeestdagenAanpassenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
