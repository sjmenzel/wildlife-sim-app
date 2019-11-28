import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSpeciesComponent } from './download-species.component';

describe('DownloadSpeciesComponent', () => {
  let component: DownloadSpeciesComponent;
  let fixture: ComponentFixture<DownloadSpeciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadSpeciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
