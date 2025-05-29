import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TodosService} from '../../services/todos.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  todoService = inject(TodosService);

  onAddTaskClick() {
    this.todoService.setCreateMode();
  }

}
