import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MemberService } from 'src/services/member.service';
import * as jwt_decode from 'jwt-decode';
import { Role } from 'src/enum/role';
import { HttpErrorResponse } from '@angular/common/http';
import { SecurityUtil } from 'src/security/security.util';

@Component({
  selector: 'app-delete-member-dialog',
  templateUrl: './delete-member-dialog.component.html',
  styleUrls: ['./delete-member-dialog.component.css']
})
export class DeleteMemberDialog implements OnInit {

  loading = false;
  private currentUserRole: string;
  private isAdmin : boolean;
  public submitted : boolean = false;
  error = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeleteMemberDialog>,
              private memberService: MemberService,
              private securityUtil: SecurityUtil) {
  }

  ngOnInit() {
    this.isAdmin = this.securityUtil.isAdmin();
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if(this.isAdmin) {
      this.memberService.deleteMember(this.data.selectedMemberIdArray).subscribe(
        data => {
          this.dialogRef.close();
        },
        (error:HttpErrorResponse) => {
          this.error = error.error.errorCode + " " + error.error.result;
          this.loading = false;
        }
      );
    } else {
      this.memberService.deleteUserMember(this.data.selectedMemberIdArray).subscribe(
        data => {
          this.dialogRef.close();
        },
        (error:HttpErrorResponse) => {
          this.error = error.error.errorCode + " " + error.error.result;
          this.loading = false;
        }
      );
    }  
  }

}
