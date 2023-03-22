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
    this._courses.addCourses(this.singleCourse).subscribe(
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
}
