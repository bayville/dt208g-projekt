import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  //Variable to store courses
  private courses: Course[] = []

  constructor(private snackBar : MatSnackBar) { 
    this.loadCourses();
  }

getCourses(): Course[]{
  return this.courses;
}

addCourse(course: Course): boolean {
    try {
      this.courses.push(course);
      this.saveCourse()
      return true;
    } catch (error) {
      return false;
    }
  }
  
  saveCourse() : void{
    sessionStorage.setItem('courseSchedule', JSON.stringify(this.courses));
  }

  loadCourses() : void {
    this.courses = [];
    const storedCourses: string | null = sessionStorage.getItem('courseSchedule');
    if (storedCourses) {
      this.courses = JSON.parse(storedCourses);
    } else {
      this.snackBar.open('Error, det finns inga kurser att hämta', 'Stäng', {
        duration: 3000, // 3 sekunder
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    }
    
  }
}
