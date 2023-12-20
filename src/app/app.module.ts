import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import {NgFor, NgIf, UpperCasePipe} from "@angular/common";

@NgModule({
  declarations: [
    CarsComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgIf,
    NgFor,
    UpperCasePipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
