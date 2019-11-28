import { Component, OnInit, Input } from '@angular/core';
import { Species } from 'src/app/classes/species';
import { LocalDataService } from 'src/app/services/local-data.service';
import { RemoteDataService } from 'src/app/services/remote-data.service';

@Component({
  selector: 'app-your-species',
  templateUrl: './your-species.component.html',
  styleUrls: ['./your-species.component.scss']
})
export class YourSpeciesComponent implements OnInit {

  @Input() speciesList: Species[]

  constructor(
  ) { }

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

}
