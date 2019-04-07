import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MemberListComponent } from './member-list.component';

@NgModule({
  declarations: [
    MemberListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [MemberListComponent]
})
export class RestApiProjectModule { }