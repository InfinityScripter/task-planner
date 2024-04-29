import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import moment from "moment";
import {LocalStorageService} from "../local-storage.service";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  content: string;
  completed: boolean;
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

  addTask(title: string, dueDate: string, content: string) {
    const task: Task = {
      id: this.nextTaskId++,
      title,
      dueDate: moment(dueDate, 'YYYY-MM-DD').format('DD.MM.YYYY'),
      content,
      completed: false
    };
    this.updateTasks([...this.tasks, task]);
  }

  removeTask(id: number) {
    this.updateTasks(this.tasks.filter(task => task.id !== id));
  }
  toggleTaskStatus(id: number) {
    this.tasks = this.tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task);
    this.localStorageService.setItem(this.date || 'default', this.tasks);
  }
}
