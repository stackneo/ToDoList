import {Component, signal} from '@angular/core';
import {GreetingComponent} from '../components/greeting/greeting.component';

@Component({
  selector: 'app-home',
  imports: [GreetingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  welcomeMessage = signal('Welcome to the To Do List app!')

}
