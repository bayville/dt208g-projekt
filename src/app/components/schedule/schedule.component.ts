import { Component } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

  schedule: Course[] = [];

  constructor(private scheduleService : ScheduleService){
    this.schedule = this.scheduleService.getCourses()
    console.log(this.schedule);
  }

}
