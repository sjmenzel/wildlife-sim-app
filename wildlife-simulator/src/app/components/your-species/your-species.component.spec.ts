import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourSpeciesComponent } from './your-species.component';

describe('YourSpeciesComponent', () => {
  let component: YourSpeciesComponent;
  let fixture: ComponentFixture<YourSpeciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourSpeciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
