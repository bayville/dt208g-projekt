import { Routes } from '@angular/router';
import { ScheduleListComponent } from './components/schedule-list/schedule.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'schedule', component: ScheduleListComponent },
    { path: 'courses', component: CourseListComponent },
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
];
