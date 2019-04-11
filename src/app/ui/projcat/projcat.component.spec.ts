import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjcatComponent } from './projcat.component';

describe('ProjcatComponent', () => {
  let component: ProjcatComponent;
  let fixture: ComponentFixture<ProjcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
