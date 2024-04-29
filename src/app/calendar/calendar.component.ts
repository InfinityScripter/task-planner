import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {NativeDateAdapter} from '@angular/material/core';
import {Router} from '@angular/router';
import moment from "moment";

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
  constructor(private router: Router) {}

  onDateDblClick() {
    const formattedDate = moment(this.selected).format('YYYY-MM-DD');
    this.router.navigate(['/day', formattedDate]);
  }

  setSelected(date: Date | null) {
    this.selected = date;
    this.formattedSelected = date ? moment(date).format('YYYY-MM-DD') : null;
  }
}
