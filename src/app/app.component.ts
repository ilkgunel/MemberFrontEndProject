import { Component } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'MemberFrontEndProject';

  constructor(private router : Router){};

  public gotoMemberList() {
    this.router.navigate(["member-list"]).then( (e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
}
}
