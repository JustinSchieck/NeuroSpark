import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.component.html',
  styleUrl: './task-filters.component.scss'
})
export class TaskFiltersComponent {
  @Output() filterChanged = new EventEmitter<{ energy: string, avoidance: number, dopamine: boolean }>();

  energy: 'low' | 'medium' | 'high' | '' = '';
  avoidance = 0;
  dopamineHit = false;

  onFilterChange(): void {
    this.filterChanged.emit({
      energy: this.energy,
      avoidance: this.avoidance,
      dopamine: this.dopamineHit
    });
  }

  resetFilters(): void {
    this.energy = '';
    this.avoidance = 0;
    this.dopamineHit = false;
    this.onFilterChange();
  }
}
