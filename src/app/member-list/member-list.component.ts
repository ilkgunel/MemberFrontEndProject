import { Component, OnInit, AfterViewInit, Injectable } from "@angular/core";
import { MemberService } from 'src/services/member.service';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import * as jwt_decode from 'jwt-decode';
import { Role } from 'src/enum/role';
import {SelectionModel} from '@angular/cdk/collections';
import { Member } from 'src/interface/member';
import { MatDialog } from '@angular/material';
import { UpdateMemberDialog } from '../update-member-dialog/update-member-dialog.component';

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
    public disableUpdateButton : boolean = true;
    selection = new SelectionModel<Member>(true, []);
    private currentUserRole: string;
    constructor(
                private _memberService: MemberService,
                private _authService: AuthenticationService,
                public _dialog: MatDialog,
                private router: Router,
                ){}

    ngOnInit() {
      var decoded = jwt_decode(localStorage.getItem('bearerToken'));
      this.currentUserRole = decoded.roles;
      if(this.currentUserRole == Role.Admin){
        this.isAdmin = true;
      } else {
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

  openMemberUpdateDialog() {
    let selectedMember = this.selection.selected[0];
    let dialogRef = this._dialog.open(UpdateMemberDialog,{
      data: {
        id: selectedMember.id,
        firstName: selectedMember.firstName,
        lastName: selectedMember.lastName,
        email: selectedMember.email, //must be passive at update dialog
        enabled: selectedMember.enabled, //must be passive at update dialog
        memberLanguageCode: selectedMember.memberLanguageCode,
        password: selectedMember.password
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this._memberService.getMembers().subscribe(data => this.members = data);
      this.masterToggle();
    });
  }

  changeEvent(event,row) {
    if(event) {
      this.selection.toggle(row);
    }
    this.enableOrDisableUpdateButton();
  }

  rowClickEvent(row) {
    this.selection.toggle(row);
    this.enableOrDisableUpdateButton();
  }

  private enableOrDisableUpdateButton() {
    if(this.selection.selected.length == 0 || this.selection.selected.length > 1) {
      this.disableUpdateButton = true;
    }
    else if((!this.isAdmin && this.selection.selected[0].roleOfMember.role != this.currentUserRole)) {
      this.disableUpdateButton = true;
    } else {
      this.disableUpdateButton = false;
    }
  }
}
