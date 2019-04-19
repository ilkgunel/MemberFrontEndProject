import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MemberService } from 'src/services/member.service';
import { LoginComponent } from 'src/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {JwtInterceptor} from 'src/interceptor/jwt.interceptor';
import {ErrorInterceptor} from 'src/interceptor/error.interceptor';

import {MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { MemberListComponent } from 'src/restapiproject/member-list.component';
import { MemberAddComponent } from './member-add/member-add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MemberListComponent,
    MemberAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                MemberService
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
