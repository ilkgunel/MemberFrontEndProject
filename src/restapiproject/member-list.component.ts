import { Component, OnInit } from "@angular/core";
import { MemberService } from 'src/services/member.service';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';


@Component({
    selector: 'member-list',
    templateUrl: './member-list.component.html',
    styles: []
})
export class MemberListComponent implements OnInit{
    public members = [];
    public errorMsg;
    constructor(
                private _memberService: MemberService,
                private _authService: AuthenticationService,
                private router: Router,
                ){}
    ngOnInit() {
      this._memberService.getMembers().subscribe(data => this.members = data);
    }

  public logout(){
    this._authService.logout();
    this.router.navigate(['/login']);
  }
}
