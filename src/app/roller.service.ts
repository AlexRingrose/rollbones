import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RollerService {
  constructor() {
  }

  rollSet ( num: number, die: number ) {
    let set: Array<number> = [];
    for ( let i = 0; i < num; i++ ){
      set[ i ] = this.rollDie( die );
    }
    return set;
  }

  rollDie ( die: number ) {
    return Math.floor(Math.random() * ( die ) + 1);
  }
}
