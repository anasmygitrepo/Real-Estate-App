import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Nav-bar/Nav-bar.component';
import { propertyCardComponent } from './property/property-card/property-card-component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { HousingService } from './services/housing.service';
import { HttpErrorInterceptorService } from './services/httperror-interceptor.service';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { PageNotFoundComponent } from './PageNotFound/PageNotFound.component';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserRegisterComponent } from './User/user-register/user-register.component';
import { AlertyfyService } from './services/Alertyfy.service';
import { AuthService } from './services/Auth.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FilterPipe } from './Pipes/Filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { PhotoupoderComponent } from './property/photoupoder/photoupoder.component';

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
    resolve: { prp: PropertyDetailResolverService },
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
    PhotoupoderComponent,
    UserRegisterComponent,
    FilterPipe,
    SortPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(Approuts),
    NgxGalleryModule,

    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
    HousingService,
    AlertyfyService,
    AuthService,
    PropertyDetailResolverService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
