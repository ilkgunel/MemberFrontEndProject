import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/login/login.component';
import { AuthGuard } from 'src/security/auth.guard';
import { MemberAddComponent } from './member-add/member-add.component';
import { MemberListComponent } from './member-list/member-list.component';
import { Role } from 'src/enum/role';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
  {
    path:"member-list",
    component: MemberListComponent,
    canActivate: [AuthGuard],
    data: {roles:[Role.Admin,Role.User]}
  },
  {
    path:"member-add",
    component: MemberAddComponent,
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
