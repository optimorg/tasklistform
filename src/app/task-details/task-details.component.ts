import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() task?: Task;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTask: Task = {
    id: ''
    text: ''
  };
  message = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTask = { ...this.task };
  }

  updateTask(): void {
    const data = {
      text: this.currentTask.text
    };

    if (this.currentTask.id) {
      this.taskService.update(this.currentTask.id, data)
        .then(() => this.message = 'The task was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteTask(): void {
    if (this.currentTask.id) {
      this.taskService.delete(this.currentTask.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The task was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}
