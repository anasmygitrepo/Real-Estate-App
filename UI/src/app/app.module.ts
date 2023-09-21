import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Nav-bar/Nav-bar.component';
import { propertyCardComponent } from './property/property-card/property-card-component';
import { PropertyListComponent } from './property/property-list/property-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    propertyCardComponent,
    PropertyListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
