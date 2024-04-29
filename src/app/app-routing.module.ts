import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DayComponent} from "./day/day.component";
import {CalendarComponent} from "./calendar/calendar.component";

const routes: Routes = [
  { path: '', component: CalendarComponent },
  { path: 'day/:date', component: DayComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
