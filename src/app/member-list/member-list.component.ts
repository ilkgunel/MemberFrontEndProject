import { Component, OnInit, AfterViewInit } from "@angular/core";
import { MemberService } from 'src/services/member.service';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import * as jwt_decode from 'jwt-decode';
import { Role } from 'src/enum/role';
import {SelectionModel} from '@angular/cdk/collections';
import { Member } from 'src/interface/member';


@Component({
    selector: 'member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['member-list.component.css']
})
export class MemberListComponent implements AfterViewInit{
    displayedColumns: string[] = ['select', 'id', 'firstName', 'lastName', 'email','enabled','password','memberLanguageCode','roleOfMember'];
    public members = [];
    public errorMsg;
    public isAdmin:boolean = false;
    selection = new SelectionModel<Member>(true, []);
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

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.members.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.members.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Member): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
