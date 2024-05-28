import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-stat-box',
  standalone: true,
  imports: [],
  templateUrl: './stat-box.component.html',
  styleUrl: './stat-box.component.scss'
})
export class StatBoxComponent {
  courses : Course[] = [];
  subjects : string[] = [];
  totalCourses : number = 0;
  totalSubjects : number = 0;

  constructor(private courseService : CourseService) {}
  
  ngOnInit() {
    this.courseService.loadCourses().subscribe((courses => {
      this.courses = courses;
      console.log(this.courses);
      this.getSubjects();
      this.totalCourses = this.courses.length;
      this.totalSubjects = this.subjects.length;
      console.log(this.subjects);
    }));
  }
  
  getSubjects(): void {
    const subjectsSet = new Set<string>(); //Using set to guarantee no duplicates are added
    this.courses.forEach(course => {
      subjectsSet.add(course.subject);
    });
    // Convert Set back to an array
    this.subjects = Array.from(subjectsSet);
  }

}
