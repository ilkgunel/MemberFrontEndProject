import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MemberService } from 'src/services/member.service';
import { LoginComponent } from 'src/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {JwtInterceptor} from 'src/interceptor/jwt.interceptor';
import {ErrorInterceptor} from 'src/interceptor/error.interceptor';

import {MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import { MemberAddComponent } from './member-add/member-add.component';
import { MemberListComponent } from './member-list/member-list.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MemberAddComponent,
    MemberListComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                MemberService
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
