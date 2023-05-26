import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: Task = new Task();
  submitted = false;

  constructor(private taskService: TaskService) {}
  
  ngOnInit(): void {
    
  }

  saveTask(): void {
    this.taskService.create(this.task).then(() => {  //create the task using the service
      alert('Created task succesfully!');
      this.submitted = true;
    });
  }

  newTask(): void {
    this.submitted = false;  //not submitted until saved
    this.task = new Task();
  }
}
