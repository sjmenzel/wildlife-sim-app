import { Component, OnInit, Input } from '@angular/core';
import { Species } from 'src/app/classes/species';
import { LocalDataService } from 'src/app/services/local-data.service';
import { RemoteDataService } from 'src/app/services/remote-data.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSpeciesComponent } from '../create-species/create-species.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-your-species',
  templateUrl: './your-species.component.html',
  styleUrls: ['./your-species.component.scss']
})
export class YourSpeciesComponent implements OnInit {

  @Input() speciesList: Species[]

  constructor(
    public dialog: MatDialog,
    private local: LocalDataService,
    private id: IdentityService,
    private snackBar: MatSnackBar
  ) { }

  selectedSpecies: Species;

  // loadedSpecies: Species[] = [
  //   {name: 'African Lion', class: 'Mammal', author: 'Sam', imageURL: '/assets/lion.png', stats: {
  //     env: 3.5,
  //     com: 8.0,
  //     rep: 4.0,
  //     nrg: 2.5
  //   }},
  //   {name: 'Giant Panda', class: 'Mammal', author: 'Sam', imageURL: '/assets/panda.png'}
  // ]

  ngOnInit() {
  }

  openCreateSpecies(): void {
    const dialogRef = this.dialog.open(CreateSpeciesComponent, {
      width: '800px',
      height: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  unsubscribe(species: Species) {
    this.snackBar.open('Unsubscribed from ' + species.name + ' created by ' + species.author, undefined, {
      duration: 2000,
    });


    this.local.removeSpecies(species);
  }

  isCreator(species: Species){
    return this.id.isAuthorOf(species)
  }


}
