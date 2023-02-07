import { AfterViewInit, Component,  ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit{
  courses= '';
  mode='';
  start='';
  end='';
  contact = '';

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'courses'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  mode: string;
  weight: string;
  symbol: string;
  courses: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
  {mode: '', name: '', weight: '', symbol: '', courses: ''},
];

