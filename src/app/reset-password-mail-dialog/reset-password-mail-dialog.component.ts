import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemberService } from 'src/services/member.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password-mail-dialog',
  templateUrl: './reset-password-mail-dialog.component.html',
  styleUrls: ['./reset-password-mail-dialog.component.css']
})
export class ResetPasswordMailDialog implements OnInit {

  resetPasswordMailForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  sendMailMessage = '';

  constructor(public dialogRef: MatDialogRef<ResetPasswordMailDialog>,
              private formBuilder: FormBuilder,
              private memberService: MemberService) { }

  ngOnInit() {
    this.resetPasswordMailForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  
  get f() { 
    return this.resetPasswordMailForm.controls; 
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetPasswordMailForm.invalid) {
      return;
    }
    this.loading = true;
    
    this.memberService.sendingPasswordResetMail(this.resetPasswordMailForm.value)
    .subscribe(
      data=>{
        this.sendMailMessage = data.body.result;
        this.delay(3000).then(any=>{
        this.dialogRef.close();
     });
    },
    (error:HttpErrorResponse)=>{
      this.error = error.error.errorCode + " " + error.error.result;
      this.loading = false;
    })
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

}
