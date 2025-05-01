import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[] = [];

  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<string>();

  ngOnInit() {
    // Load tasks from localStorage on component initialization
    this.loadTasksFromLocalStorage();
  }

  // Load tasks from localStorage and set them in the component
  loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasks = savedTasks;
  }

  // Method to add a new task
  addTask(newTask: Task): void {
    // Add the task to the local array
    this.tasks.push(newTask);

    // Save the updated task list to localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Refresh the task list to reflect the new task
    this.loadTasksFromLocalStorage();
  }

  // Toggle the completion status of a task
  toggleComplete(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };

    // Emit updated task
    this.taskUpdated.emit(updatedTask);

    // Update localStorage with the new task list
    this.updateTasksInLocalStorage(updatedTask);
  }

  // Delete a task by id
  deleteTask(id: string): void {
    this.taskDeleted.emit(id);

    // Remove task from localStorage
    const updatedTasks = this.tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Reload tasks after deletion
    this.loadTasksFromLocalStorage();
  }

  // Helper function to update tasks in localStorage
  updateTasksInLocalStorage(updatedTask: Task) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = tasks.findIndex((task: Task) => task.id === updatedTask.id);

    if (index !== -1) {
      tasks[index] = updatedTask;
    } else {
      tasks.push(updatedTask);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.loadTasksFromLocalStorage();
  }

  // Get the background color based on the task energy level
  getEnergyColor(energy: string): string {
    switch (energy) {
      case 'low': return '#9bd3ae';
      case 'medium': return '#f2c94c';
      case 'high': return '#eb5757';
      default: return '#ccc';
    }
  }
}
