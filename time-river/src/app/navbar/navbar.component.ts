import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private stateService: StateService,
  ) { }

  ngOnInit() {
  }

  showInfoWindow(){
    this.stateService.showInfoWindow = !this.stateService.showInfoWindow;
  }

  showColorWindow(){
    this.stateService.showColorWindow = !this.stateService.showColorWindow;
  }

}
