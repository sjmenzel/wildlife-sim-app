import { Component, OnInit } from '@angular/core';
import { PortraitSelectComponent } from '../portrait-select/portrait-select.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateSpeciesFormComponent } from '../create-species-form/create-species-form.component';

@Component({
  selector: 'app-create-species',
  templateUrl: './create-species.component.html',
  styleUrls: ['./create-species.component.scss']
})
export class CreateSpeciesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateSpeciesFormComponent>,
    ) { }

  ngOnInit() {

  }

  portraitUrl: string = ""

  data: {}

  speciesData: {}

  openPortraitSelect(): void {
    const dialogRef = this.dialog.open(PortraitSelectComponent, {
      width: '800px',
      height: '600px',
      data: { url: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.portraitUrl = result.url
    });
  }

  sliderValue(value) {
    return value / 10
  }

  submit(){
    this.speciesData['imageUrl'] = ''
    this.dialogRef.close(this.data);
  }

}
