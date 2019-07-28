import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { RollObject } from "./roll-object";
import { strict } from 'assert';

@Injectable( {
  providedIn: 'root'
} )
export class RollerService {
  constructor () {

  }
  /*
    My regex filter:
    https://regexr.com/4i2nq
    /((\d*)?d(\d+)(([+-/*]\d+(?!d))|(k\d+)|([+-/*](\d*)?d\d+))?(([+-/*]\d+(?!d))|(\d+)|([+-/*](\d*)?d\d+))?(([+-/*]\d+(?!d))|(\d+)|([+-/*](\d*)?d\d+))?){1}/g
  */

  //TODO: add support for numeric and die adding e.g. 2d6 + d6 + 2

  rollParser ( input: string ) {
    let matches: Array<string>;
    //match dice rolls in traditional format with modifiers up to 4 'terms'
    matches = input.match(
      /((\d*)?d(\d+)(([+-/*]\d+(?!d))|(k\d+)|([+-/*](\d*)?d\d+))?(([+-/*]\d+(?!d))|(\d+)|([+-/*](\d*)?d\d+))?(([+-/*]\d+(?!d))|(\d+)|([+-/*](\d*)?d\d+))?){1}/g
    );
    console.log( matches );

    //TODO: For single match, loop or functionify for multi matches

    const singleMatch = matches[ 0 ];
    let rolls: Array<any> = [];
    const delims = [ '' ].concat( singleMatch.match( /[+-/*]|k/g ) );
    let splitOnDelim = singleMatch.split( /[+-/*]|k/g );
    console.log( "This match: ", singleMatch );

    for ( let i = 0; i < splitOnDelim.length; i++ ) {
      let num: number, die: number;
      let splitOnSecondary = splitOnDelim[ i ];
      if ( delims[ i ] === 'k' ) {
        //TODO: Keep <splitOnDelim[i] highest dice>
        console.log( 'Roll Type: K#' )
        let res: RollObject = {
          result: [], die: 0,
          func: delims[ i ], mod: Number( splitOnSecondary ), total: 0
        }
        rolls[ i ] = res;

      } else if ( ( splitOnSecondary.match( /(d)/ ) ) === null ) {
        console.log( 'Roll Type: #' );
        let res: RollObject = {
          result: [], die: 0,
          func: delims[ i ], mod: Number( splitOnSecondary ), total: 0
        }
        rolls[ i ] = res;

      } else if ( ( splitOnSecondary.match( /^d/g ) ) !== null ) {
        console.log( 'Roll Type: d#' );
        let splitOnDie = splitOnSecondary.replace( /d/, "" );
        num = 1;
        die = Number( splitOnDie );
        let tres = this.rollDice( num, die );
        let res: RollObject = {
          result: tres.result, die: tres.die,
          func: delims[ i ], mod: 0, total: 0
        };
        rolls[ i ] = res;

      } else {
        console.log( 'Roll Type: #d#' );
        let splitOnDie = splitOnSecondary.split( /d/ )
        num = Number( splitOnDie[ 0 ] );
        die = Number( splitOnDie[ 1 ] );
        let tres = this.rollDice( num, die );
        let res: RollObject = {
          result: tres.result, die: tres.die,
          func: delims[ i ], mod: 0, total: 0
        };
        rolls[ i ] = res;
      }
    }
    console.log( 'roll Set:', rolls );
  }

  rollDice ( num: number, die: number ) {
    let rolls: Array<any> = [];
    for ( let i = 0; i < num; i++ ) {
      rolls[ i ] = this.rnd( die );
    }
    return { result: rolls, die: die };
  }

  private rnd ( die: number ) {
    return Math.floor( Math.random() * ( die ) + 1 )
  }
}
