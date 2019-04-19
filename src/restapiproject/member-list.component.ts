import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MemberService } from 'src/services/member.service';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';


@Component({
    selector: 'member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['member-list.component.css']
})
export class MemberListComponent implements AfterViewInit{
    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','enabled','password','memberLanguageCode','roleOfMember'];
    public members = [];
    public errorMsg;
    constructor(
                private _memberService: MemberService,
                private _authService: AuthenticationService,
                private router: Router,
                ){}

    ngAfterViewInit() {
      console.log('ngAfterViewInit içerisindeyiz: '+ localStorage.getItem('bearerToken'));
      this._memberService.getMembers().subscribe(data => this.members = data);
    }

  public logout(){
    this._authService.logout();
    this.router.navigate(['/login']);
  }
}
