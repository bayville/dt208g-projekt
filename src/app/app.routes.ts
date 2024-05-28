import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: 'schedule', 
    loadComponent: () => import('./pages/schedule/schedule.component').then(c => c.ScheduleComponent)}, //Lazyloads the component 
    { path: 'courses', 
    loadComponent: () => import('./pages/courses/courses.component').then(c => c.CoursesComponent) }, //Lazyloads the component 
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent) }
];
