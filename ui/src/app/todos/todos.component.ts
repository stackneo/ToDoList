import {Component, inject, signal, OnInit,} from '@angular/core';
import { TodosService } from '../services/todos.service';
import {ToDo} from '../model/todo.type';
import {catchError} from 'rxjs';
import {NgFor} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-todos',
  imports: [
    NgFor,
    RouterLink
  ],
  templateUrl: './todos.component.html',
  standalone: true,
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<ToDo>>([]);

  ngOnInit() {
    this.todoService
      .getAllTodos()
      .pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe(todos => {
      this.todoItems.set(todos);
    });
  }

  deleteTask(taskId: number) {
    this.todoService.deleteTask(taskId).subscribe({
      next: () => {
        console.log('Task deleted successfully');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  editTask(task: ToDo) {
    this.todoService.setUpdateMode(task)
  }
}
