import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpeciesFormComponent } from './create-species-form.component';

describe('CreateSpeciesFormComponent', () => {
  let component: CreateSpeciesFormComponent;
  let fixture: ComponentFixture<CreateSpeciesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSpeciesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpeciesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
