import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, Form, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-species-form',
  templateUrl: './create-species-form.component.html',
  styleUrls: ['./create-species-form.component.scss']
})
export class CreateSpeciesFormComponent implements OnInit {
  isLinear = false;
  formGroup: FormGroup;
  formArray: FormArray;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

}
