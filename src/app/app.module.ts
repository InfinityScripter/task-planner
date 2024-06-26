import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import { CalendarComponent } from './calendar/calendar.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { DayComponent } from './day/day.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {AddSubtaskDialogComponent} from "./add-subtask-dialog.component/add-subtask-dialog.component.component";
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    EditTaskDialogComponent,
    AddSubtaskDialogComponent,
    AddTaskDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatMomentDateModule,
    CalendarComponent,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
