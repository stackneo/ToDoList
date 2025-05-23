import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  loadComponent: () => {
    return import('./home/home.component').then(m => m.HomeComponent);
  },
},
  {
    path: 'todos',
    loadComponent: () => {
      return import('./todos/todos.component').then(m => m.TodosComponent);
    }
  }
];
