import { Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  //Apiurl containing courses in JSON format.
  apiUrl: string = `https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json`;
  
  //Inject HttpClient
  constructor(private http: HttpClient) {}

  //Fetch courses
  loadCourses(): Observable<Course[]> {
    const courses = this.http.get<Course[]>(this.apiUrl);
    return courses;
  }

}
