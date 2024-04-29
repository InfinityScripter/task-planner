import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import moment from "moment";
import {LocalStorageService} from "../local-storage.service";

interface Task {
  id: number;
  content: string;
}

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  date: string | null = null;
  formattedDate: string | null = null;
  tasks: Task[] = [];
  nextTaskId = 0;

  constructor(private route: ActivatedRoute, private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.date = this.route.snapshot.paramMap.get('date');
    this.formattedDate = this.date ? moment(this.date, 'YYYY-MM-DD').format('DD.MM.YYYY') : null;
    this.tasks = this.localStorageService.getItem(this.date || 'default') || [];
    this.nextTaskId = this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 0;
  }

  updateTasks(newTasks: Task[]) {
    this.tasks = newTasks;
    this.localStorageService.setItem(this.date || 'default', this.tasks);
  }

  addTask(content: string) {
    this.updateTasks([...this.tasks, {id: this.nextTaskId++, content}]);
  }

  removeTask(id: number) {
    this.updateTasks(this.tasks.filter(task => task.id !== id));
  }
}
