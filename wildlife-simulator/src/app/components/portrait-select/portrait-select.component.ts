import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-portrait-select',
  templateUrl: './portrait-select.component.html',
  styleUrls: ['./portrait-select.component.scss']
})
export class PortraitSelectComponent implements OnInit {

  images = [
    '/assets/lion.png',
    '/assets/komodo.png',
    '/assets/panda.png',
    '/assets/iguana.png',
    '/assets/ostrich.png',
    '/assets/penguin.png',
    '/assets/elephant.png',
    '/assets/frog.png',
    '/assets/bat.png',
  ]

  constructor(
    public dialogRef: MatDialogRef<PortraitSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {url: string}
  ) { }

  ngOnInit() {
    console.log(this.data)
  }

  selectImage(imgUrl: string){
    
    this.data.url = imgUrl
    this.dialogRef.close(this.data);
  }

}
