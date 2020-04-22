import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstellingenAanpassenComponent } from './instellingen-aanpassen.component';

describe('InstellingenAanpassenComponent', () => {
  let component: InstellingenAanpassenComponent;
  let fixture: ComponentFixture<InstellingenAanpassenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstellingenAanpassenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstellingenAanpassenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
