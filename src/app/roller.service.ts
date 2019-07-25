import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RollerService {
  tString;
  constructor () {
    let tInput = '4d6'
  }
  /*
    My regex filter:
    https://regexr.com/4i2nq
    /((\d*)?d(\d+)(([+-/*]\d+(?!d))|(k\d+)|([+-/*](\d*)?d\d+))?){1}/g
  */

  rollParser (input:string) {
    let num: number, die: number, bonus: number;
    let keep: number, drop: number;
  }

  rollSet ( num: number, die: number ) {
    let set: Array<any> = [];
    for ( let i = 0; i < num; i++ ){
      set[ i ] = this.rollDie( die );
    }
    return set;
  }

  rollDie ( die: number ) {
    return  {
      die: "d" + die,
      roll: Math.floor( Math.random() * ( die ) + 1 )
    };
  }
}
