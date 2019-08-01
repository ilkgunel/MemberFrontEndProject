import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SecurityUtil } from 'src/security/security.util';
import { MemberService } from 'src/services/member.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-update-dialog',
  templateUrl: './password-update-dialog.component.html',
  styleUrls: ['./password-update-dialog.component.css']
})
export class PasswordUpdateDialog implements OnInit {

  submitted = false;
  loading = false;
  errorMessage = '';
  passwordChangeMessage = '';

  passwordUpdateForm : FormGroup;

  constructor(private formBuilder : FormBuilder,
              private securityUtil : SecurityUtil,
              private memberService: MemberService) { }

  ngOnInit() {
    this.passwordUpdateForm = this.formBuilder.group({
      oldPassword : ['',Validators.required],
      newPassword : ['',Validators.required]
    });
  }

  get f() {
    return this.passwordUpdateForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.passwordUpdateForm.invalid) {
      return;
    }

    this.loading = true;

    let emailOfCurrentUser = this.securityUtil.mailAddressFromToken();

    this.memberService.updatePassword(emailOfCurrentUser, this.passwordUpdateForm.value.newPassword, this.passwordUpdateForm.value.oldPassword)
                      .subscribe(data => {
                                  this.passwordChangeMessage = data.body.result;
                                  this.loading = false;
                                 },
                                 (error:HttpErrorResponse) => {
                                   this.errorMessage = error.error.errorCode + ' ' + error.error.result;
                                   this.loading = false;
                                 });

  }

}
