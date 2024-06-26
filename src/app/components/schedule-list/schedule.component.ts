import { Component, ViewChild } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { NgFor, NgIf } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
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
  selector: 'app-schedule-list',
  standalone: true,
  imports: [
    NgFor, 
    MatTabsModule, 
    MatProgressBarModule, 
    NgIf, 
    ScheduleListComponent, 
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
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleListComponent {
 //Variable to store courses array
 courses : Course[] = [];
 subjects : string[] = [];
 points : number = 0;
 //Bolean to show or hide loading spinner
 loaded: boolean = false;
 displayedColumns: string[] = ['courseCode', 'courseName', 'points' , 'subject', 'actions'];
 dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>();
 
 @ViewChild(MatSort) sort: MatSort = <MatSort>{};
 @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

 constructor(private courseService : CourseService, private scheduleService: ScheduleService, private snackBar : MatSnackBar) {
 
 }
 
 //Starts to get the schedule and get the total points from courses saved i schedule service
 ngOnInit() {
  this.scheduleInit();
  this.points = this.scheduleService.countPoints();
}

//Gets all saved courses
scheduleInit(): void {
  const savedCourses = this.scheduleService.getCourses();
  if (savedCourses){
    this.courses = savedCourses;
    this.loaded = true;
    this.dataSource = new MatTableDataSource(this.courses);
    this.getSubjects();
    this.points = this.scheduleService.countPoints();
  }
}

//Initates the paginator and sort module
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

//Get the subjects from saved courses
getSubjects(): void {
  const subjectsSet = new Set<string>(); //Using set to guarantee no duplicates are added
  this.courses.forEach(course => {
    subjectsSet.add(course.subject);
  });
  // Convert Set back to an array
  this.subjects = Array.from(subjectsSet);
}

//Applies filter from search
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }

}

//Sets the datasource
setDatasource(dataSource: Course[]) : void{
  this.dataSource.data = dataSource;
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

//Applies the select dropdown filter
applySelectFilter(event: any) {
  if (event.value === 'Alla'){
    this.setDatasource(this.courses);
  } else {
      let filteredData: Course[] = this.courses.filter((course) => course.subject === event.value);
      this.setDatasource(filteredData);
  }
}

//Removes course from schedule and displays snackbar based on succes or fail
removeCourse(course : Course){
  this.scheduleService.removeCourse(course).subscribe(response => {
    if (response.status === true) {
      this.snackBar.open(`Kursen ${course.courseName} borttagen från ramschema.`, 'Stäng', {
        duration: 3000, // 3 sekunder
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      })
      this.scheduleInit();
      this.ngAfterViewInit();
    } else {
      this.snackBar.open(`${response.error}`, 'Stäng', {
        duration: 3000, // 3 sekunder
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['failed-snackbar']
      });
    }
  });
}

//Clears the schedule and reloads schedule
clearSchedule(){
  const confirm = window.confirm('Är du säker på att du vill rensa ramschemat?');
  if (confirm){
    this.scheduleService.removeAllCourses();
    this.scheduleInit();
  }
 }
 
 }
