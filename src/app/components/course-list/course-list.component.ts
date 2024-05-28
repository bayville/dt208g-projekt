import { Component, ViewChild } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { NgFor, NgIf } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ScheduleService } from '../../services/schedule.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SpinnerComponent } from '../spinner/spinner.component';


@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    NgFor, 
    MatTabsModule, 
    MatProgressBarModule, 
    NgIf, 
    MatProgressSpinnerModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginator, 
    MatFormFieldModule, 
    MatIconModule, 
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    SpinnerComponent
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent{
  //Variable to store courses array
  courses : Course[] = [];
  subjects : string[] = [];

  //Bolean to show or hide loading spinner
  loaded: boolean = false;
  displayedColumns: string[] = ['courseCode', 'courseName', 'points' , 'subject', 'actions'];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>();
  
  @ViewChild(MatSort) sort: MatSort = <MatSort>{};
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  constructor(private courseService : CourseService, private scheduleService: ScheduleService, private snackBar : MatSnackBar) {
  
  }
  
  ngOnInit() {
    this.courseService.loadCourses().subscribe((courses => {
      this.loaded = true;
      this.courses = courses;
      this.dataSource = new MatTableDataSource(this.courses); 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.getSubjects();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  setDatasource(dataSource: Course[]) : void{
    this.dataSource.data = dataSource;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applySelectFilter(event: any) {
    if (event.value === 'Alla'){
      this.setDatasource(this.courses);
    } else {
        let filteredData: Course[] = this.courses.filter((course) => course.subject === event.value);
        this.setDatasource(filteredData);
    }
  }

  addCourse(course : Course){
    this.scheduleService.addCourse(course).subscribe(respone => {
      if (respone.status === true) {
        this.snackBar.open(`Kursen ${course.courseName} tillagd i ramschema.`, 'Stäng', {
          duration: 3000, // 3 sekunder
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        })
      } else {
        this.snackBar.open(`${respone.error}`, 'Stäng', {
          duration: 3000, // 3 sekunder
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['failed-snackbar']
        });
      }
    });

  }
  
  }
