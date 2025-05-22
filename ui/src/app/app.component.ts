import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <app-home></app-home>
    </main>
  `,
  styles: [ `
    main {
      padding: 16px;
    }
  `],
})
export class AppComponent {
  title = 'ui';
}
