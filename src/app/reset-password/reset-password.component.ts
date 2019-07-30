import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/services/member.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPassword implements OnInit {

  public showNewPasswordAreas : boolean;
  public errorMessage: string;

  resetPasswordForm : FormGroup;

  loading = false;
  submitted = false;

  constructor(private route:ActivatedRoute,
              private memberService: MemberService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    let resetPasswordToken = this.route.snapshot.queryParams["resetToken"];
    this.memberService.checkingPasswordResetToken(resetPasswordToken)
    .subscribe(data => {
      this.showNewPasswordAreas = true;
    },
      (error:HttpErrorResponse) => {
        this.showNewPasswordAreas = false;
        this.errorMessage = error.error.errorCode + ' ' + error.error.result;
      } );

      this.resetPasswordForm = this.formBuilder.group({
        newPassword: ['', Validators.required],
        repeatedNewPassword: ['', Validators.required]
      })
  }

  get f() { 
    return this.resetPasswordForm.controls; 
  }

  onSubmit() {
    this.submitted = true;
    
    if(this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.resetPasswordForm.value.newPassword);
    console.log(this.resetPasswordForm.value.repeatedNewPassword);

    if(this.resetPasswordForm.value.newPassword != this.resetPasswordForm.value.repeatedNewPassword) {
      this.errorMessage = "Passwords do not match!"
      this.loading = false;
      return;
    }

  }

}
