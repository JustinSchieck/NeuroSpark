import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  onTaskAdded(newTask: Task): void {
    this.taskService.addTask(newTask);
    this.loadTasks();
  }

  onTaskUpdated(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask.id, updatedTask);
    this.loadTasks();
  }

  onTaskDeleted(taskId: string): void {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }

  handleNewTask(newTask: Task) {
    this.tasks.push(newTask);
    // Optionally, save the new task to localStorage here as well
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

}
