import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import {NgFor, NgIf, UpperCasePipe} from "@angular/common";
import { CarDetailComponent } from './car-detail/car-detail.component';
import { MessageComponent } from './message/message.component';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {WelcomeComponent} from './home/welcome.component';
import { AddCarComponent } from './add/add-car.component';

@NgModule({
  declarations: [
    CarsComponent,
    WelcomeComponent,
    AppComponent,
    CarDetailComponent,
    AddCarComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgIf,
    NgFor,
    UpperCasePipe,
    RouterModule.forRoot([
      {path: 'cars', component: CarsComponent},
      {path: 'cars/:vin', component: CarDetailComponent},
      {path: 'cars/add', component: AddCarComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'},

    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
