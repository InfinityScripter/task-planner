import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {NativeDateAdapter} from '@angular/material/core';
import {Router} from '@angular/router';
import moment from "moment";
import {LocalStorageService} from "../local-storage.service";



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: true,
  providers: [NativeDateAdapter],
  imports: [MatCardModule, MatDatepickerModule],

})
export class CalendarComponent {

  selected: Date | null = null;
  formattedSelected: string | null = null;
  datesWithTasks: string[] = [];
  constructor(private router: Router,private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.datesWithTasks = this.localStorageService.getAllKeys();
  }
isDateHighlighted(date: Date): boolean {
  const dateString = moment(date).format('YYYY-MM-DD');
  return this.datesWithTasks.includes(dateString);
}

  onDateDblClick() {
    const formattedDate = moment(this.selected).format('YYYY-MM-DD');
    this.router.navigate(['/day', formattedDate]);
  }

  setSelected(date: Date | null) {
    this.selected = date;
    this.formattedSelected = date ? moment(date).format('YYYY-MM-DD') : null;
  }

  dateClass = (d: Date) => {
    return this.isDateHighlighted(d) ? 'special-date' : '';
  };
}
