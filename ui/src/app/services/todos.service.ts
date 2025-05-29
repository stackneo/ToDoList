import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToDo} from '../model/todo.type';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  http = inject(HttpClient);
  isUpdate = signal(false);
  currentTask = signal<ToDo | null>(null);

  getAllTodos() {
    const url = `http://localhost:8080/api`
    return this.http.get<Array<ToDo>>(url).pipe(
      map((response: any) => response.tasks)
    );
  }

  addTask(task: ToDo) {
    const url = `http://localhost:8080/api`
    return this.http.post<ToDo>(url, task);
  }

  deleteTask(taskId: number) {
    const url = `http://localhost:8080/api/${taskId}`
    return this.http.delete(url);
  }

  updateTask(taskId: number, task: ToDo) {
    const url = `http://localhost:8080/api/${taskId}`
    return this.http.put(url, task);
  }

  setUpdateMode(task: ToDo) {
    this.isUpdate.set(true);
    this.currentTask.set(task);
  }

  setCreateMode() {
    this.isUpdate.set(false);
    this.currentTask.set(null);
  }
}
