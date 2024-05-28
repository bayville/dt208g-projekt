import { Component } from '@angular/core';
import { CourseListComponent } from '../../components/course-list/course-list.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseListComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

}
