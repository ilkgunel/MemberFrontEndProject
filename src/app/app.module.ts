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

import {MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatDialogModule} from '@angular/material';
import { AddUserMemberComponent } from './add-user-member/add-user-member.component';
import { MemberListComponent } from './member-list/member-list.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AddAdminMemberComponent } from './add-admin-member/add-admin-member.component';
import { UpdateMemberDialog } from './update-member-dialog/update-member-dialog.component';
import { DeleteMemberDialog } from './delete-member-dialog/delete-member-dialog.component';
import { ResetPassword } from './reset-password/reset-password.component';
import { ResetPasswordMailDialog } from './reset-password-mail-dialog/reset-password-mail-dialog.component';
import { PasswordUpdateDialog } from './password-update-dialog/password-update-dialog.component';
import { AddBulkAdminMemberDialog } from './add-bulk-admin-member-dialog/add-bulk-admin-member-dialog.component';
import { AddBulkUserMemberDialog } from './add-bulk-user-member-dialog/add-bulk-user-member-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddUserMemberComponent,
    MemberListComponent,
    AccessDeniedComponent,
    AddAdminMemberComponent,
    UpdateMemberDialog,
    DeleteMemberDialog,
    ResetPassword,
    ResetPasswordMailDialog,
    PasswordUpdateDialog,
    AddBulkAdminMemberDialog,
    AddBulkUserMemberDialog
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
    MatCheckboxModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents:[UpdateMemberDialog,DeleteMemberDialog,ResetPasswordMailDialog,PasswordUpdateDialog,AddBulkAdminMemberDialog,AddBulkUserMemberDialog],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
                MemberService
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
