import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Member } from 'src/interface/member';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemberLanguageCode } from 'src/interface/memberLanguageCode';
import { MemberService } from 'src/services/member.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-member-dialog',
  templateUrl: './update-member-dialog.component.html',
  styleUrls: ['./update-member-dialog.component.css']
})
export class UpdateMemberDialog implements OnInit {

  memberUpdateForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  memberLanguageCodes : MemberLanguageCode[] = [
    {name: 'TR', value: 'tr'},
    {name: 'EN', value: 'en'},
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public member: Member,
              public dialogRef: MatDialogRef<UpdateMemberDialog>,
              private formBuilder: FormBuilder,
              private memberService: MemberService,) {
  }

  ngOnInit() {
    console.log("ng init çalıştı!"); 
    this.memberUpdateForm = this.formBuilder.group({
      firstName: [this.member.firstName, Validators.required],
      lastName: [this.member.lastName, Validators.required],
      email:[this.member.email,Validators.required],
      memberLanguageCode:[this.member.memberLanguageCode,Validators.required]
    });
  }

  get f() { 
    return this.memberUpdateForm.controls; 
  }

  onSubmit() {
    this.submitted = true;
    let data = {};
    // stop here if form is invalid
    if (this.memberUpdateForm.invalid) {
      return;
    }

    this.loading = true;

    this.memberService.updateAdminMember(this.memberUpdateForm.value) 
      .subscribe(
        data => {
        },
        (error:HttpErrorResponse) => {
          this.error = error.error.errorCode + " " + error.error.result;
          this.loading = false;
        }
      );
  }

}
