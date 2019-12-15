import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, Form, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PortraitSelectComponent } from '../portrait-select/portrait-select.component';

@Component({
  selector: 'app-create-species-form',
  templateUrl: './create-species-form.component.html',
  styleUrls: ['./create-species-form.component.scss']
})
export class CreateSpeciesFormComponent implements OnInit {
  isLinear = false;
  formGroup: FormGroup;
  formArray: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog
    ) {}

  portraitUrl = '';

  onStep = 1;
  maxSteps = 11;

  progress = (this.onStep / this.maxSteps) * 100;

  sizeValue = 3;

  offspringCount = 1;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  openPortraitSelect(): void {
    const dialogRef = this.dialog.open(PortraitSelectComponent, {
      width: '800px',
      height: '600px',
      data: { url: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.portraitUrl = result.url;
    });
  }

  next() {
    this.onStep += 1;
    this.progress = (this.onStep / this.maxSteps) * 100;
  }

  previous() {
    this.onStep -= 1;
    this.progress = (this.onStep / this.maxSteps) * 100;
  }

  offspringDisplay() {
    switch(this.offspringCount) {
      case 1:
        return '<1 a year';
      case 2:
        return '1 a year';
      case 3:
        return '2-9 a year';
      case 4:
        return '10-50 a year';
      default:
        return '50+ a year';
    }
  }

  sizeValueDisplay() {
    switch(this.sizeValue) {
      case 1:
        return 'Tiny';
      case 2:
        return 'Small';
      case 3:
        return 'Medium';
      case 4:
        return 'Large';
      default:
        return 'Huge';
    }
  }

}
