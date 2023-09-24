import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Nav-bar/Nav-bar.component';
import { propertyCardComponent } from './property/property-card/property-card-component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { HousingService } from './services/housing.service';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { PageNotFoundComponent } from './PageNotFound/PageNotFound.component';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserRegisterComponent } from './User/user-register/user-register.component';
import { AlertyfyService } from './services/Alertyfy.service';
import { AuthService } from './services/Auth.service';

const Approuts: Routes = [
  {
    path: 'add-property',
    component: AddPropertyComponent,
  },
  {
    path: '',
    component: PropertyListComponent,
  },
  {
    path: 'property-rent',
    component: PropertyListComponent,
  },
  {
    path: 'property-detail/:Id',
    component: PropertyDetailComponent,
  },
  {
    path: 'user/register',
    component: UserRegisterComponent,
  },
  {
    path: 'user/login',
    component: UserLoginComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    propertyCardComponent,
    PropertyListComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    PageNotFoundComponent,
    UserLoginComponent,
    UserRegisterComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(Approuts),
    FormsModule,
  ],
  providers: [HousingService, AlertyfyService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
