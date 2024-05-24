import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  //Variable to store courses
  private courses: Course[] = []

  constructor(private snackBar : MatSnackBar) { 
    this.loadSavedCourses();
  }

getCourses(): Course[]{
  return this.courses;
}

addCourse(course: Course): Observable<any> {
    try {
        const existingCourse = this.courses.find((c) => c.courseCode === course.courseCode);
        console.log(existingCourse);

        if (existingCourse) {
            const error = new Error('Kursen är redan tillagd i ramschema');
            return of({ error: error, status: false });
        } else {
            this.courses.push(course);
            this.saveCourse();
            return of({ message: "Kurs tillagd", status: true });
        }
    } catch (error) {
        return of({ error: error, status: false });
    }
}

  
  saveCourse() : void{
    localStorage.setItem('courseSchedule', JSON.stringify(this.courses));
  }

  loadSavedCourses() : void {
    this.courses = [];
    const storedCourses: string | null = localStorage.getItem('courseSchedule');
    if (storedCourses) {
      this.courses = JSON.parse(storedCourses);
    }    
  }
}
