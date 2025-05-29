import {Component, effect, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import {Router} from '@angular/router';
import {ToDo} from '../../model/todo.type';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  todoService = inject(TodosService);

  router = inject(Router);

  isUpdate = this.todoService.isUpdate;
  currentTask = this.todoService.currentTask;



  constructor() {
    effect(() => {
      const task = this.currentTask();
      if (task && this.isUpdate()) {
        this.populateForm(task);
      }
    });
  }
  // Create new form group to store all user inputs
  newTask = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    startDate: new FormControl<string>(''),
    endDate: new FormControl<string>(''),
    status: new FormControl<string>(''),
  });

  // Pre-populates form on existing values
  populateForm(task: ToDo) {


    // Start and end-date converted to ISO format to display correctly
    const startDate = task.startDate ? new Date(task.startDate).toISOString().split('T')[0] : '';
    const endDate = task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '';

    // Patched in
    this.newTask.patchValue({
      name: task.name,
      description: task.description,
      startDate: startDate,
      endDate: endDate,
      status: task.status,
    })
  }


  onSubmit() {
      const formValue = this.newTask.value;


      const task: ToDo = {
        name: formValue.name ?? '',
        description: formValue.description ?? '',
        startDate: formValue.startDate ? new Date(formValue.startDate).toISOString() : '',
        endDate: formValue.endDate ? new Date(formValue.endDate).toISOString() : '',
        status: formValue.status ?? '',
      }

      // Runs if on create mode
    if (this.newTask.valid && !this.isUpdate()) {
      // Hooks to service to run the task, resets if
      this.todoService.addTask(task).subscribe({
        next: () => {
          // Redirect to list page
          this.router.navigate(['/todos']);

        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    // Runs if on edit mode
    else {
      this.todoService.updateTask(this.currentTask()!.id!, task).subscribe({
        next: () => {
          this.router.navigate(['/todos']);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
