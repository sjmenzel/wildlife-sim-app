import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor() { }

  private _name = "Sam"


  public getName() {
    return this._name
  }

  public isAuthorOf(item: any) {
    if(item != undefined && item.author != undefined){
      return item.author == this._name
    }
    return false
  }
}
