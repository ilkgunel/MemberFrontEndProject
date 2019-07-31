import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private formBuilder : FormBuilder  ) { }

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
  }

}
