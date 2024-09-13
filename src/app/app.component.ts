/* eslint-disable */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MainComponent } from './components/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
