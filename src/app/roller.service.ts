import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { RollObject } from "./roll-object";
import { strict } from 'assert';

@Injectable( {
  providedIn: 'root'
} )
export class RollerService {
  private rollHistory: Array<any>;

  constructor () {
    this.rollHistory = [];
  }
  /*
    My regex filter:
    https://regexr.com/4i2nq
    /((\d*)?d(\d+)(([+-]\d+(?!d))|(k\d+)|([+-](\d*)?d\d+))?(([+-]\d+(?!d))|(\d+)|([+-](\d*)?d\d+))?(([+-]\d+(?!d))|(\d+)|([+-](\d*)?d\d+))?){1}/g
  */

  public rollParser ( input: string ) {
    let rollSets: Array<any> = [];
    let matches: Array<string>;
    //match dice rolls in traditional format with modifiers up to 4 'terms'
    matches = input.match(
      /((\d*)?d(\d+)(([+-]\d+(?!d))|(k\d+)|([+-](\d*)?d\d+))?(([+-]\d+(?!d))|(\d+)|([+-](\d*)?d\d+))?(([+-]\d+(?!d))|(\d+)|([+-](\d*)?d\d+))?){1}/g
    );
    console.log( matches );

    //Loop through pattern matches and process each roll
    for ( let i = 0; i < matches.length; i++ ) {

      const singleMatch = matches[ i ];
      let rolls: Array<RollObject> = [];
      const delims = [ '' ].concat( singleMatch.match( /[+-]|k/g ) );
      let splitOnDelim = singleMatch.split( /[+-]|k/g );
      console.log( "This match: ", singleMatch );

      for ( let i = 0; i < splitOnDelim.length; i++ ) {
        let num: number, die: number;
        let splitOnSecondary = splitOnDelim[ i ];
        if ( delims[ i ] === 'k' ) {
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
      const logReturn = this.calcTotal( rolls );
      console.log( "logReturn : ", logReturn );
      this.rollHistory.push( logReturn );
      rollSets[ i ] = logReturn;
    }

    return rollSets;
  }

  public calcTotal ( rolls: Array<RollObject> ) {
    let setTotal = 0;
    rolls.forEach( roll => {
      let rollTotal = 0;
      if ( roll.func === 'k' ) {
        roll.result = this.keepDice( roll.result, roll.mod )
      }

      roll.result.forEach( ele => {
        rollTotal += ele
      } );
      roll.total = rollTotal + roll.mod;

      if ( roll.func === "" ) {
        setTotal = roll.total;
      } else if ( roll.func === '+' ) {
        setTotal += roll.total;
      } else if ( roll.func === '-' ) {
        setTotal -= roll.total;
      }

    } );
    return { setTotal: setTotal, rolls: rolls };
  }

  public getHistory () {
    return this.rollHistory;
  }

  private keepDice ( result: Array<any>, num: number ) {
    result.sort();
    return result.slice( 0, result.length - 1 - ( num - 1 ) );
  }

  private rollDice ( num: number, die: number ) {
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
