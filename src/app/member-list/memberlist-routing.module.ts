import { Routes } from "@angular/router";
import { MemberListComponent } from './member-list.component';

const crisisCenterRoutes: Routes = [
    {
      path: 'memberlist-root',
      component: MemberListComponent,
      children: [
        {
          path: '',
          component: MemberListComponent,
          children: [
            {
              path: ':id',
              component: MemberListComponent
            },
            {
              path: '',
              component: MemberListComponent
            }
          ]
        }
      ]
    }
  ];
  