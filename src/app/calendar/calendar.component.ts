import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {NativeDateAdapter} from '@angular/material/core';

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
}
