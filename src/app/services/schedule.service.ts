import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Observable, of } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  //Variable to store courses
  private courses: Course[] = []

constructor() { 
  this.loadSavedCourses();
}

public getCourses(): Course[]{
  return this.courses;
}

public addCourse(course: Course): Observable<Response> {
  try {
      const existingCourse = this.courses.find((c) => c.courseCode === course.courseCode);
      if (existingCourse) {
          const error = new Error('Kursen är redan tillagd i ramschema');
          return of({ error: error, status: false });
      } else {
          this.courses.push(course);
          this.saveCourses();
          return of({ message: "Kurs tillagd", status: true });
      }
  } catch (error) {
      return of({ error: error as Error, status: false });
  }
}

public removeCourse(course: Course): Observable<Response> {
  try {
    const initialLength = this.courses.length;
    this.courses = this.courses.filter(c => c.courseCode !== course.courseCode);
  if (this.courses.length < initialLength) {
    this.saveCourses();
      return of({ message: "Kurs borrtagen", status: true });
    } else {
      this.courses.push(course);
      this.saveCourses();
      const error = new Error('Kursen hittades inte i ramschemat');
      return of({ error: error, status: false });    }
  } catch (error) {
    return of({ error: error as Error, status: false });

  }
}

public countPoints(): number {
  return this.courses.reduce((total, {points}) => total + (points), 0);

}

public removeAllCourses() {
  this.courses = [];
  this.saveCourses();
}
  
private saveCourses() : void{
  localStorage.setItem('courseSchedule', JSON.stringify(this.courses));
}

private loadSavedCourses() : void {
  this.courses = [];
  const storedCourses: string | null = localStorage.getItem('courseSchedule');
  if (storedCourses) {
    this.courses = JSON.parse(storedCourses);
  }    
}
}
