import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberListComponent } from 'src/restapiproject/member-list.component';
import { LoginComponent } from 'src/login/login.component';
import { AuthGuard } from 'src/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'member-list',
    pathMatch: 'full'
  },
  {
    path:'',
    component:MemberListComponent
  },
  {
    path:"member-list",
    component: MemberListComponent,
    canActivate: [AuthGuard]
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
