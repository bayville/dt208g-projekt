import { Component } from '@angular/core';
import { ScheduleListComponent } from '../../components/schedule-list/schedule.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [ScheduleListComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

}
