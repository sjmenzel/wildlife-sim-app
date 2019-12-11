import { Injectable } from '@angular/core';
import { Species } from '../classes/species';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor(
    private cookies: CookieService
  ) { }

  private _savedSpecies: Species[] = []

  getSavedSpecies() {
    if (this.cookies.check('saved-species')) {
      const saved = JSON.parse(this.cookies.get('saved-species'))
      this._savedSpecies = saved;
    }
    return this._savedSpecies;
  }

  saveSpecies(species: Species) {
    this._savedSpecies.push(species)

    this.cookies.set('saved-species', JSON.stringify(this._savedSpecies))
  }

  removeSpecies(species: Species) {
    const index = this._savedSpecies.indexOf(species);
    if (index > -1) {
      this._savedSpecies.splice(index, 1);
    }

    this.cookies.set('saved-species', JSON.stringify(this._savedSpecies))
  }

  clearSpecies() {
    this.cookies.delete('saved-species');
    this._savedSpecies = []
  }

  hasSpecies(species) {
    for (const s of this._savedSpecies) {
      if (s.name == species.name && s.author == species.author) {
        return true;
      }
    }
    return false;
  }




}
