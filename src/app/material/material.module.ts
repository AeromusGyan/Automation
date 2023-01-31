import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const MaterialComponents=[
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSnackBarModule,
  MatCardModule,
  MatToolbarModule,
  MatListModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatRadioModule, 
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatDialogModule,
  CdkAccordionModule,
  MatButtonToggleModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialComponents
  ],
  exports:[
    MaterialComponents
  ]
})
export class MaterialModule { }
