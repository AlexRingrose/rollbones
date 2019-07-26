import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { strict } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class RollerService {
  tString;
  constructor () {

  }
  /*
    My regex filter:
    https://regexr.com/4i2nq
    /((\d*)?d(\d+)(([+-/*]\d+(?!d))|(k\d+)|([+-/*](\d*)?d\d+))?){1}/g
  */

  //TODO: add support for numeric and die adding e.g. 2d6 + d6 + 2

  rollParser ( input: string ) {
    let matches: Array<string>;
    //match dice rolls in traditional format with modifiers
    matches = input.match(
      /((\d*)?d(\d+)(([+-/*]\d+(?!d))|(k\d+)|([+-/*](\d*)?d\d+))?){1}/g
    );
    console.log( matches );

    //TODO: For single match, loop or functionify

    //find which delimitter and store it
    //TODO:~ K not dealt with yet
    //split on +-/*
    //split on d
    let num: number, die: number, bonus: number, delim: string;
    const temp = matches[ 0 ];
    delim = temp[ temp.search( /[+-/*]|k/ ) ];
    let splitOnDelim = temp.split( /[+-/*]|k/ );
    console.log( temp, delim, splitOnDelim );

    //Base Die
    //fixed index splitOnDelim, change if supporting numeric and die adding
    //TODO: solve if no num before d, if case then default to num dice 1
    if ( (splitOnDelim[ 0 ].search( /^d/ ) ) >= 0) {
      console.log("no leading num E.G. d8")
      let splitOnBaseDie = splitOnDelim[ 0 ].replace( /d/, "" );
      num = 1;
      die = Number( splitOnBaseDie );
      console.log(splitOnBaseDie, num, die)
    } else {
      console.log("leading num")
      let splitOnBaseDie = splitOnDelim[ 0 ].split( /d/ )
      num = Number( splitOnBaseDie[ 0 ] );
      die = Number( splitOnBaseDie[ 1 ] );
    }
    let baseDie = this.roll( num, die );

    //Secondary
    let splitOnSecondary = splitOnDelim[1]

    console.log( 'roll base die:' , baseDie) ;
  }

  roll ( num: number, die: number ) {
    let set: Array<any> = [];
    for ( let i = 0; i < num; i++ ){
      set[ i ] = this.rollDie( die );
    }
    return set;
  }

  private rollDie ( die: number ) {
    return  {
      die: "d" + die,
      roll: Math.floor( Math.random() * ( die ) + 1 )
    };
  }
}
