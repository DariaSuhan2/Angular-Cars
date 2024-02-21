import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import {NgFor, NgIf, UpperCasePipe} from "@angular/common";
import { CarDetailComponent } from './car-detail/car-detail.component';
//import { MessageComponent } from './message/message.component';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {WelcomeComponent} from './home/welcome.component';
//import { AddCarComponent } from './add/add-car.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { CarTableComponent } from './car-table/car-table.component';
// import { CarService } from '../service/car.service';

@NgModule({
  declarations: [
    CarsComponent,
    WelcomeComponent,
    AppComponent,
    CarDetailComponent,
   // AddCarComponent,
    ModalComponent,
    AddEditModalComponent,
    CarTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgIf,
    NgFor,
    NgSelectModule,
    UpperCasePipe,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'cars', component: CarsComponent},
     //{path: 'car/add', component: AddCarComponent},
      {path: 'car/table', component: CarTableComponent},
      {path: 'car/details/:vin', component: CarDetailComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'cars', pathMatch: 'full'},
      {path: '**', redirectTo: 'cars', pathMatch: 'full'},
     

    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
