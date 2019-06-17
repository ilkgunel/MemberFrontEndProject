import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MemberService } from 'src/services/member.service';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import * as jwt_decode from 'jwt-decode';
import { Role } from 'src/enum/role';


@Component({
    selector: 'member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['member-list.component.css']
})
export class MemberListComponent implements AfterViewInit{
    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','enabled','password','memberLanguageCode','roleOfMember'];
    public members = [];
    public errorMsg;
    public isAdmin:boolean = false;
    constructor(
                private _memberService: MemberService,
                private _authService: AuthenticationService,
                private router: Router,
                ){}

    ngOnInit() {
      var decoded = jwt_decode(localStorage.getItem('bearerToken'));
      var currentUserRole = decoded.roles;
      if(currentUserRole == Role.Admin){
        console.log("true dönüyoruz!");
        this.isAdmin = true;
      } else {
        console.log("false dönüyoruz!");
        this.isAdmin = false;
      }
    }

    ngAfterViewInit() {
      this._memberService.getMembers().subscribe(data => this.members = data);
    }

  public logout(){
    this._authService.logout();
    this.router.navigate(['/login']);
  }
}
