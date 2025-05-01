import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../shared/models/task.model'; // Assuming this is the Task model

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    id: Date.now().toString(), // Set a unique id based on timestamp
    title: '',
    description: '',
    energy: 'low',
    avoidance: 0,
    dopamineHit: false,
    completed: false,
    createdAt: new Date,
    tags: []
  };

  // Emit event when a new task is submitted
  @Output() taskSubmitted = new EventEmitter<Task>();

  constructor() {}

  ngOnInit(): void {
    // Load saved task if it exists in localStorage
    const savedTask = JSON.parse(localStorage.getItem('task') || 'null');
    if (savedTask) {
      this.task = savedTask; // Load saved task into the form
    }
  }

  onSubmit(): void {
    // Emit the task to the parent component
    this.taskSubmitted.emit(this.task);

    // Save the new task to localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    savedTasks.push(this.task); // Add new task to the list
    localStorage.setItem('tasks', JSON.stringify(savedTasks)); // Save the updated list

    // Optionally reset the form after submission
    this.resetForm();
  }

  resetForm(): void {
    this.task = {
      id: Date.now().toString(), // Set a unique id based on timestamp
      title: '',
      description: '',
      energy: 'low',
      avoidance: 0,
      dopamineHit: false,
      completed: false,
      createdAt: new Date,
      tags: []
    };

    localStorage.removeItem('task'); // Optionally remove saved task data from localStorage
  }

  // Optionally save the task form data in localStorage as the user types
  onInputChange(): void {
    localStorage.setItem('task', JSON.stringify(this.task));
  }
}
