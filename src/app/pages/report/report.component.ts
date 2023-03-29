import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private courses: CoursesService) { }

  ngOnInit(): void {
    this.getAllCourse();
  }
  public chart: any;
  public barChart: any;

  date: any = {
    start: '',
    end: ''
  }

  dateData: any = [];
  vcrPercent: any;
  crPercent: any;
  rbtPercent: any;
  jitPercent: any;

  getAllCourse() {
    this.dateData.length = 0;
    this.courses.getAllCourses().subscribe(
      (res: any) => {
        this.dateData = res;
        this.getTypePercent();
        setTimeout(() => {
          this.pieChart();
          this.typeChart();
          this.barCharts();
        }, 1000);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  getDataStartEnd() {
    if (this.date.start === '' || this.date.end === '') {
      alert("Choose Start Date and End Date!!");
    }
    else{
      const startDate = this.date.start;
      const sDate = new Date(startDate);
      const endDate = this.date.end;
      const eDate = new Date(endDate);
      this.courses.getDataStartEnd(sDate.toISOString().substring(0, 10), eDate.toISOString().substring(0, 10)).subscribe(
        (res: any) => {
          this.dateData.length = 0;
          this.dateData = res;
          this.getTypePercent();
          setTimeout(() => {
            this.pieChart();
            this.typeChart();
            this.barChart();
          }, 1000);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    }
  }

  getDataByType(type: any) {
    this.dateData.length = 0;
    this.courses.getDataByType(type, 0, 0, 0).subscribe(
      (res: any) => {
        this.dateData = res;
        this.getTypePercent();
        setTimeout(() => {
          this.pieChart();
          this.typeChart();
          this.barChart();
        }, 1000);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  getDataByMode(mode: any) {
    this.dateData.length = 0
    this.courses.getDataByType(0, mode, 0, 0).subscribe(
      (res: any) => {
        this.dateData = res;
        this.getTypePercent();
        setTimeout(() => {
          this.pieChart();
          this.typeChart();
          this.barChart();
        }, 1000);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  getTypePercent() {
    var vcr = 0;
    var cr = 0;
    var rbt = 0;
    var jit = 0;
    for (let i = 0; i < this.dateData.length; i++) {
      const element = this.dateData[i];
      if (element.course_mode === 'VCR') {
        vcr += 1;
      }
      else {
        cr += 1;
      }
      if (element.course_type === 'RBT') {
        rbt += 1;
      }
      else {
        jit += 1;
      }
    }
    this.vcrPercent = (vcr / this.dateData.length) * 100;
    this.crPercent = (cr / this.dateData.length) * 100;
    this.rbtPercent = (rbt / this.dateData.length) * 100;
    this.jitPercent = (jit / this.dateData.length) * 100;
  }

  pieChart() {
    this.chart = new Chart("modeChart", {
      type: 'pie',
      data: {
        labels: [
          'VCR',
          'CR'
        ],
        datasets: [{
          label: 'Course Mode',
          data: [this.vcrPercent, this.crPercent],
          backgroundColor: [
            '#48D3AA',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgb(75, 192, 192)',
            'rgb(255, 99, 132)',
          ]
        }]
      },
      options: {
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            yAlign: "bottom",
          },
          title: {
            display: true,
            text: 'Course Mode'
          },
          legend: {
            display: false
          },
        },
        // aspectRatio: 3.5,
        // responsive: true,
        // cutout: "95%",
        // rotation: 270, // start angle in degrees
        // circumference: 180, // sweep angle in degrees
      },
    },
    );
  }

  typeChart() {
    this.chart = new Chart("typeChart", {
      type: 'pie',
      data: {
        labels: [
          'RBT',
          'JIT'
        ],
        datasets: [{
          label: 'Course Type',
          data: [this.rbtPercent, this.jitPercent],
          backgroundColor: [
            '#48D3AA',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgb(75, 192, 192)',
            'rgb(255, 99, 132)',
          ]
        }]
      },
      options: {
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            yAlign: "bottom",
          },
          title: {
            display: true,
            text: 'Course Type'
          },
          legend: {
            display: false
          },
        },
        // aspectRatio: 3.5,
        // responsive: true,
        // cutout: "95%",
        // rotation: 270, // start angle in degrees
        // circumference: 180, // sweep angle in degrees
      },
    },
    );
  }

  barCharts() {
    this.barChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: [

        ],
        datasets: [{
          indexAxis: 'x',
          label: 'No of Slots',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              offset: true
            }
          },
        }
      },
    });
    for (let i = 0; i < this.dateData.length; i++) {
      const element = this.dateData[i];
      this.barChart.data.labels.push(element.course_name);
      this.barChart.data.datasets[0].data.push(element.no_of_slots);
      this.barChart.update();
    }
  }

}
