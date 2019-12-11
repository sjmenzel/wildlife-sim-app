import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateSpeciesComponent } from 'src/app/components/create-species/create-species.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    
  }

  openPortraitSelect(): void {
    const dialogRef = this.dialog.open(CreateSpeciesComponent, {
      width: '600px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

}
