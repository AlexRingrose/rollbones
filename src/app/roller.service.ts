import { Injectable } from '@angular/core';
import { xorshift } from 'xorshift/xorshift';

@Injectable({
  providedIn: 'root'
})
export class RollerService {

  constructor() {

  }

  private rollSet ( num: number, die: number ) {
    let set: Array<number>;
    for ( let i = 0; i < num; i++ ){
      set[ 0 ] = this.rollDie( die );
    }
    return set;
  }

  private rollDie ( die:number ) {
    return Math.floor( 1 + xorshift.random() * ( die - 1 ) );
  }
}
