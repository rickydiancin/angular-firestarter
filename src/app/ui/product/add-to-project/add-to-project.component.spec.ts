import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToProjectComponent } from './add-to-project.component';

describe('AddToProjectComponent', () => {
  let component: AddToProjectComponent;
  let fixture: ComponentFixture<AddToProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
