import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberListComponent } from 'src/restapiproject/member-list.component';
import { LoginComponent } from 'src/login/login.component';
import { AuthGuard } from 'src/security/auth.guard';
import { MemberAddComponent } from './member-add/member-add.component';

const routes: Routes = [
  {
    path:"member-list",
    component: MemberListComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"member-add",
    component: MemberAddComponent,
    canActivate: [AuthGuard]
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
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
