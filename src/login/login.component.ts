import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/services/authentication.service';
import { MatDialog } from '@angular/material';
import { ResetPasswordMailDialog } from 'src/app/reset-password-mail-dialog/reset-password-mail-dialog.component';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    if(this.route.snapshot.queryParams['returnUrl']) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    } else {
      this.returnUrl = "/member-list";
    }

    if(this.authenticationService.getToken()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error.message;
          this.loading = false;
        });
  }

  openPasswordResetMailDialog() {
    let dialogRef = this._dialog.open(ResetPasswordMailDialog,{});
  }
}
