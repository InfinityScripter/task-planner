import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent {
  date: Date;

  constructor(private route: ActivatedRoute) {
    const dateParam = this.route.snapshot.paramMap.get('date');
    this.date = dateParam ? new Date(dateParam) : new Date();
  }
}
