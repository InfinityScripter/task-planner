import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import moment from "moment";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  date: string | null = null;
  formattedDate: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.date = this.route.snapshot.paramMap.get('date');
    this.formattedDate = this.date ? moment(this.date, 'YYYY-MM-DD').format('DD.MM.YYYY') : null;
  }
}
