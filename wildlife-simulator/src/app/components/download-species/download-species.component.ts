import { Component, OnInit, Input } from '@angular/core';
import { Species } from 'src/app/classes/species';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Direction } from '@angular/cdk/bidi';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-download-species',
  templateUrl: './download-species.component.html',
  styleUrls: ['./download-species.component.scss']
})
export class DownloadSpeciesComponent implements OnInit {

  @Input() speciesList: Species[]

  constructor(
    private _snackBar: MatSnackBar,
    private local: LocalDataService
    ) { }

  allSpecies: Species[] = []

  ngOnInit() {
    this.allSpecies = this.speciesList
  }

  barWidth(stat) {
    return 25 * stat;
  }

  addSpecies(species: Species){
    this._snackBar.open('Subscribed to ' + species.name + ' created by ' + species.author, undefined, {
      duration: 2000,
    });


    this.local.saveSpecies(species);
  }

  hasSpecies(species: Species){
    return this.local.hasSpecies(species);
  }

}
