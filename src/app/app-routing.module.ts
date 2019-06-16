import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/login/login.component';
import { AuthGuard } from 'src/security/auth.guard';
import { AddUserMemberComponent } from './add-user-member/add-user-member.component';
import { MemberListComponent } from './member-list/member-list.component';
import { Role } from 'src/enum/role';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AddAdminMemberComponent } from './add-admin-member/add-admin-member.component';

const routes: Routes = [
  {
    path:"member-list",
    component: MemberListComponent,
    canActivate: [AuthGuard],
    data: {roles:[Role.Admin,Role.User]}
  },
  {
    path:"add-user-member",
    component: AddUserMemberComponent,
    canActivate: [AuthGuard],
    data: {roles:[Role.Admin,Role.User]}
  },
  {
    path:"add-admin-member",
    component: AddAdminMemberComponent,
    canActivate: [AuthGuard],
    data: {roles:[Role.Admin]}
  },
  {
    path: '',
    redirectTo: 'member-list',
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'access-denied',
    component:AccessDeniedComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
