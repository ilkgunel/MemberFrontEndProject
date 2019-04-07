import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {RestApiProjectModule} from '../restapiproject/member-list.module';

import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { MemberService } from 'src/services/member.service';
import { LoginComponent } from 'src/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {JwtInterceptor} from 'src/interceptor/jwt.interceptor';
import {ErrorInterceptor} from 'src/interceptor/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RestApiProjectModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                MemberService
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
