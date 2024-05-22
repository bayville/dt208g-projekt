import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { NgFor, NgIf } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ScheduleService } from '../../services/schedule.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScheduleComponent } from '../schedule/schedule.component';


@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [NgFor, MatTabsModule, MatProgressBarModule , NgIf, MatProgressSpinnerModule, ScheduleComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent {
  //Variable to store courses array
  courses : Course[] = [];
  //Bolean to show or hide loading spinner
  loaded: boolean = false;

  constructor(private courseService : CourseService, private scheduleService: ScheduleService, private snackBar : MatSnackBar) {
    //Get courses from sessionStorage
    const cashedCourses = sessionStorage.getItem('courses');

    //If courses in sessionStorage save to courses varible
    if (cashedCourses){
      this.courses = JSON.parse(cashedCourses);
      this.loaded = true;
    } else{
      //Else fetch courses from courseService
      this.courseService.loadCourses().subscribe((courses => {
        sessionStorage.setItem('courses', JSON.stringify(courses)); //Save to sessionstorage
        this.loaded = true;
        this.courses = courses;
      }))
    }
  }

  addCourse(course : Course){
    const addedCourse = this.scheduleService.addCourse(course);

    if (addedCourse){
      this.snackBar.open(`Kursen ${course.courseName} tillagd i ramschema.`, 'Stäng', {
        duration: 3000, // 3 sekunder
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    } else{
      console.log(addedCourse);
    }
  }

}
