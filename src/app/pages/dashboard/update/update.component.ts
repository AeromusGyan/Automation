import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  singleCourse: any = {
    educator: {}
  };
  constructor(
    private _courses: CoursesService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
      this.singleCourse = data;
    }
  onUpdate() {
    // alert(JSON.stringify(this.singleCourse));
    if (this.singleCourse.start_time == '' || this.singleCourse.start_time == null || this.singleCourse.end_time == '' || this.singleCourse.end_time == null) {
      this._snackBar.open('Contact Session Timing is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else if (this.singleCourse.no_of_slots == '' || this.singleCourse.no_of_slots == null) {
      this._snackBar.open('Slots to be opened is required !!', 'Close', {
        duration: this.durationInSeconds * 1000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
    else {
      this.singleCourse.contact_session_timing = this.singleCourse.start_time + '-' + this.singleCourse.end_time;
      this.updateCourses();
    }
  }
  durationInSeconds = 2;
  updateMessage: string = "";

  updateCourses() {
    this._courses.updateCourses(this.singleCourse).subscribe(
      (data: any) => {
        this.updateMessage = "Course is successfully updated.";
        setTimeout(() => {
          this.updateMessage = "";
          this.dialogRef.close(true);
        }, 3000);

        // this._snackBar.open('Successfully Updated !!', 'Close', {
        //   duration: this.durationInSeconds * 1000,
        //   verticalPosition: 'bottom',
        // });
      },
      (error) => {
        //error
        this._snackBar.open('Something went wrong !!', 'Close', {
          duration: this.durationInSeconds * 1000,
          verticalPosition: 'bottom',
        });
      })
  }

  // calculateEndTime() {
  //   const selectedCourse: any = this.courseDetails.find(course => course.name === this.singleCourse.get('course_name')!.value);
  //   const selectedStartTime = this.singleCourse.get('start_time')!.value;

  //   const durationInHours = selectedCourse.duration;
  //   const [startHour, startMinute] = selectedStartTime!.split(':');

  //   let endHour = parseInt(startHour) + Math.floor(durationInHours);
  //   let endMinute = parseInt(startMinute) + (durationInHours % 1) * 60;
  //   if (endMinute > 59) {
  //     endHour += Math.floor(endMinute / 60);
  //     endMinute = endMinute % 60;
  //   }
  //   const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  //   this.singleCourse.patchValue({ end_time: endTime });
  // }

  courseDetails: any[] = [
    { name: 'Agility and Scrum', day: 1, duration: 2, level: 1 },
    { name: 'Introduction to DevOps', day: 1, duration: 2, level: 1 },
    { name: 'Agility and Kanban', day: 1, duration: 2, level: 1 },
    { name: 'Agile Scrum in Practice', day: 3, duration: 3.5, level: 2 },
    { name: 'Kanban in Practice', day: 3, duration: 3.5, level: 2 },
    { name: 'ALM with Jira Agile', day: 1, duration: 3.5, level: 2 },
    { name: 'Introduction to Scaled Agile Framework', day: 1, duration: 4, level: 3 },
    { name: 'DevOps CICD Dotnet', day: 4, duration: 3.5, level: 3 },
    { name: 'SCM using GIT', day: 1, duration: 3.5, level: 2 },
    { name: 'DevOps CI/CICD', day: 5, duration: 4, level: 3 },
    { name: 'DevOps using Ansible', day: 3, duration: 4, level: 3 }
  ]
  
}
