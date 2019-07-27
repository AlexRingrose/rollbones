import { Component } from '@angular/core';
import { RollerService } from '../roller.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  inputString;
  constructor (public roller_:RollerService) {

  }

  test() {
    console.log( this.roller_.roll( 6, 20 ) );
    this.roller_.rollParser( this.inputString );
  }

}
