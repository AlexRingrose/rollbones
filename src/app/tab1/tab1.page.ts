import { Component } from '@angular/core';
import { RollerService } from '../roller.service'

@Component( {
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: [ 'tab1.page.scss' ]
} )
export class Tab1Page {
  inputString;
  rollHistory;
  constructor ( public roller_: RollerService ) {
    this.rollHistory = [];
  }

  test () {
    this.roller_.rollParser( this.inputString );
    this.rollHistory = this.roller_.getHistory();
    console.log( "RollHistory: ", this.rollHistory );
  }

}
