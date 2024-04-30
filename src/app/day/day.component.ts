import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import moment from "moment";
import {LocalStorageService} from "../local-storage.service";
import {EditTaskDialogComponent} from "../edit-task-dialog/edit-task-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddSubtaskDialogComponent} from "../add-subtask-dialog.component/add-subtask-dialog.component.component";
import {AddTaskDialogComponent} from "../add-task-dialog/add-task-dialog.component";

interface Task {
  id: number;
  title: string;
  dueDate: moment.Moment;
  content: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  date: string | null = null;
  formattedDate: moment.Moment | null = null;
  tasks: Task[] = [];
  nextTaskId = 0;
  editingId: number | null = null;
  taskForm: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.date = this.route.snapshot.paramMap.get('date');
    this.formattedDate = this.date ? moment(this.date, 'YYYY-MM-DD') : null;
    this.tasks = this.localStorageService.getItem(this.date || 'default') || [];
    this.nextTaskId = this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 0;
    this.taskForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'dueDate': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required)
    });
  }

  updateTasks(newTasks: Task[]) {
    this.tasks = newTasks;
    this.localStorageService.setItem(this.date || 'default', this.tasks);
  }

  addTask() {
    if (this.taskForm.valid) {
      const { title, dueDate, content } = this.taskForm.value;
      const task: Task = {
        id: this.nextTaskId++,
        title,
        dueDate: moment(dueDate, 'YYYY-MM-DD'),
        content,
        completed: false
      };
      this.updateTasks([...this.tasks, task]);
      this.taskForm.reset();
    }
  }

  removeTask(id: number) {
    this.updateTasks(this.tasks.filter(task => task.id !== id));
  }
  toggleTaskStatus(id: number) {
    this.tasks = this.tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task);
    this.localStorageService.setItem(this.date || 'default', this.tasks);
  }


  saveTask(id: number, title: string, dueDate: string, content: string) {
    this.tasks = this.tasks.map(task => task.id === id ? {...task, title, dueDate: moment(dueDate, 'YYYY-MM-DD'), content} : task);
    this.localStorageService.setItem(this.date || 'default', this.tasks);
    this.editingId = null;
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '300px',
      data: { title: task.title, content: task.content }
    });

    dialogRef.afterClosed().subscribe((result: { title: string; dueDate: string; content: string; }) => {
      if (result) {
        this.saveTask(task.id, result.title, result.dueDate, result.content);
      }
    });
  }
  addSubtask(taskId: number) {
    const dialogRef = this.dialog.open(AddSubtaskDialogComponent, {
      width: '300px',
      data: { title: '', dueDate: '', content: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const subtask: Task = {
          id: this.nextTaskId++,
          title: result.title,
          dueDate: moment(result.dueDate, 'YYYY-MM-DD'),
          content: result.content,
          completed: false
        };
        this.tasks = this.tasks.map(task => {
          if (task.id === taskId) {
            task.subtasks = [...(task.subtasks || []), subtask];
          }
          return task;
        });
        this.localStorageService.setItem(this.date || 'default', this.tasks);
      }
    });
  }
  removeSubtask(taskId: number, subtaskId: number) {
    this.tasks = this.tasks.map(task => {
      if (task.id === taskId) {
        task.subtasks = (task.subtasks || []).filter(st => st.id !== subtaskId);
      }
      return task;
    });
    this.localStorageService.setItem(this.date || 'default', this.tasks);
  }

  toggleSubtaskStatus(taskId: number, subtaskId: number) {
    this.tasks = this.tasks.map(task => {
      if (task.id === taskId && task.subtasks) {
        task.subtasks = task.subtasks.map(subtask => {
          if (subtask.id === subtaskId) {
            subtask.completed = !subtask.completed;
          }
          return subtask;
        });
      }
      return task;
    });
    this.localStorageService.setItem(this.date || 'default', this.tasks);
  }

  addTaskFromDialog(title: string, dueDate: string, content: string) {
    const task: Task = {
      id: this.nextTaskId++,
      title,
      dueDate: moment(dueDate, 'YYYY-MM-DD'),
      content,
      completed: false
    };
    this.updateTasks([...this.tasks, task]);
  }


  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTaskFromDialog(result.title, result.dueDate, result.content);
      }
    });
  }
  editSubtask(taskId: number, subtask: Task) {
    const dialogRef = this.dialog.open(AddSubtaskDialogComponent, {
      width: '300px',
      data: subtask
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasks = this.tasks.map(task => {
          if (task.id === taskId) {
            const subtasksUpdated = task.subtasks?.map(s => {
              if (s.id === subtask.id) return { ...s, ...result };
              return s;
            });
            return { ...task, subtasks: subtasksUpdated || [] };
          }
          return task;
        });
        this.localStorageService.setItem(this.date || 'default', this.tasks);
      }
    });
  }



}
