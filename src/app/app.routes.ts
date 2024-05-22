import { Routes } from '@angular/router';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CourseListComponent } from './components/course-list/course-list.component';

export const routes: Routes = [
    { path: 'schedule', component: ScheduleComponent },
    { path: 'courses', component: CourseListComponent },
];
