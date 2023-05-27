import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import {map} from 'rxjs/operators';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks?: Task[];
  currentTask?: Task;
  currentIndex = -1; //negative index = empty list
  taskText = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.retrieveTasks();
  }

  refreshList(): void {
    this.currentTask = undefined;
    this.currentIndex = -1;
    this.retrieveTasks();
  }

  retrieveTasks(): void {
    this.taskService.getAll().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
          ({ id: c.payload.doc['id'], ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.tasks = data;
    });
  }

  setActiveTask(task: Task, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
  }
}

