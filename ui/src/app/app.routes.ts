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
    },
  },
  {
    path: 'addTask',
    loadComponent: () => {
      return import('./components/task-form/task-form.component').then(m => m.TaskFormComponent);
    },
  },
  {
    path: 'editTask',
    loadComponent: () => {
      return import('./components/task-form/task-form.component').then(m => m.TaskFormComponent);
    },
  },
];
