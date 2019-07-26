import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
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
    let rollSet: Array<any> = [];
    //match dice rolls in traditional format with modifiers up to 4 'terms'
    matches = input.match(
      /((\d*)?d(\d+)(([+-/*]\d+(?!d))|(k\d+)|([+-/*](\d*)?d\d+))?(([+-/*]\d+(?!d))|(\d+)|([+-/*](\d*)?d\d+))?(([+-/*]\d+(?!d))|(\d+)|([+-/*](\d*)?d\d+))?){1}/g
    );
    console.log( matches );

    //TODO: For single match, loop or functionify for multi matches

    //TODO:~ K not dealt with yet
    const singleMatch = matches[ 0 ];
    const delims = singleMatch.match( /[+-/*]|k/g );
    let splitOnDelim = singleMatch.split( /[+-/*]|k/g );
    console.log( "This match: ", singleMatch );

    for ( let i = 0; i < splitOnDelim.length; i++ ) {
      let num: number, die: number;
      let splitOnSecondary = splitOnDelim[ i ];
      if ( delims[ i - 1 ] === 'k' ) {
        //TODO: Keep <splitOnDelim[i] highest dice>

      } else if ( ( splitOnSecondary.match( /(d)/ ) ) === null ) {
        console.log( 'Roll Type: #' );
        let res = {};
        Object.assign( res, {
          rolls: [], die: 0,
          func: delims[ i - 1 ], mod: splitOnSecondary
        } );
        rollSet[ i ] = res;

      } else if ( ( splitOnSecondary.match( /^d/g ) ) !== null ) {
        console.log( 'Roll Type: d#' );
        let splitOnDie = splitOnSecondary.replace( /d/, "" );
        num = 1;
        die = Number( splitOnDie );
        let tres = this.roll( num, die );
        let res = {};
        Object.assign( res, {
          rolls: tres.rolls, die: tres.die,
          func: delims[ i - 1 ], mod: 0
        } );
        rollSet[ i ] = res;

      } else {
        console.log( 'Roll Type: #d#' );
        let splitOnDie = splitOnSecondary.split( /d/ )
        num = Number( splitOnDie[ 0 ] );
        die = Number( splitOnDie[ 1 ] );
        let tres = this.roll( num, die );
        let res = {};
        Object.assign( res, {
          rolls: tres.rolls, die: tres.die,
          func: delims[ i - 1 ], mod: 0
        } );
        rollSet[ i ] = res;
      }
    }
    console.log( 'roll Set:', rollSet );
  }

  roll ( num: number, die: number ) {
    let set: Array<any> = [];
    for ( let i = 0; i < num; i++ ) {
      set[ i ] = this.rollDie( die );
    }
    return { rolls: set, die: die };
  }

  private rollDie ( die: number ) {
    return Math.floor( Math.random() * ( die ) + 1 )
  }
}
