import { Component, OnInit } from '@angular/core';
import { LocalDataService } from 'src/app/services/local-data.service';
import { RemoteDataService } from 'src/app/services/remote-data.service';

@Component({
  selector: 'app-browse-species',
  templateUrl: './browse-species.component.html',
  styleUrls: ['./browse-species.component.scss']
})
export class BrowseSpeciesComponent implements OnInit {
  
  savedSpecies = []
  allSpecies = []

  constructor(
    public local: LocalDataService,
    public remote: RemoteDataService
  ) { }

  ngOnInit() {
    this.savedSpecies = this.local.getSavedSpecies();
    this.allSpecies = this.remote.getAllSpecies();
  }

}
