import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor() {}

  _showInfoWindow = new BehaviorSubject(false);
  _showColorWindow = new BehaviorSubject(false);

  get showInfoWindow() {
    return this._showInfoWindow.getValue();
  }
  set showInfoWindow(_b: boolean) {
    this._showInfoWindow.next(_b);
  }
  get showInfoWindowObservable() {
    return this._showInfoWindow.asObservable();
  }

  get showColorWindow() {
    return this._showColorWindow.getValue();
  }
  set showColorWindow(_b: boolean) {
    this._showColorWindow.next(_b);
  }
  get showColorWindowObservable() {
    return this._showColorWindow.asObservable();
  }

}
