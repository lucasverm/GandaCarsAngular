import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToonLoonlijstComponent } from './toon-loonlijst.component';

describe('ToonLoonlijstComponent', () => {
  let component: ToonLoonlijstComponent;
  let fixture: ComponentFixture<ToonLoonlijstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToonLoonlijstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToonLoonlijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
