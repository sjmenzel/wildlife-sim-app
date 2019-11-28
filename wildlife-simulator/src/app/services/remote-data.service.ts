import { Injectable } from '@angular/core';
import { Species } from '../classes/species';

@Injectable({
  providedIn: 'root'
})
export class RemoteDataService {

  constructor() {

  }

  public getAllSpecies(): Species[] {
    return [
      {name: 'African Lion', class: 'Mammal', diet: 'Carnivore', author: 'Sam', imageURL: '/assets/lion.png', traits: ['Fur', ''], stats: {
          env: 3.5,
          com: 8.0,
          rep: 4.0,
          nrg: 2.5
      }},
      {name: 'Giant Panda', class: 'Mammal', diet: 'Herbivore', author: 'Sam', imageURL: '/assets/panda.png', stats: {
        env: 5.5,
        com: 2.0,
        rep: 1.5,
        nrg: 5.5
      }},
      {name: 'Komodo Dragon', class: 'Reptile', diet: 'Carnivore', author: 'Sam', imageURL: '/assets/komodo.png', stats: {
        env: 3.5,
        com: 5.0,
        rep: 2.5,
        nrg: 3.5
      }},
      {name: 'Common Ostrich', class: 'Bird', diet: 'Herbivore', author: 'Sam', imageURL: '/assets/ostrich.png', stats: {
        env: 3.5,
        com: 4.5,
        rep: 3.5,
        nrg: 1.5
      }},
      {name: 'Green Iguana', class: 'Reptile', diet: 'Herbivore', author: 'Sam', imageURL: '/assets/iguana.png', stats: {
        env: 5.5,
        com: 1.5,
        rep: 2.5,
        nrg: 2.0
      }},
    ]
  }
}
