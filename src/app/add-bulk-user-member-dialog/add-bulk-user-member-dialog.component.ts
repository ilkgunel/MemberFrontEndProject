import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MemberService } from 'src/services/member.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'add-bulk-user-member-dialog',
  templateUrl: './add-bulk-user-member-dialog.component.html',
  styleUrls: ['./add-bulk-user-member-dialog.component.css']
})
export class AddBulkUserMemberDialog implements OnInit {

  addBulkUserForm : FormGroup;
  loading = false;
  submitted = false;
  error = '';
  fileUploadMessage = '';

  selectedFile : File;

  constructor(public dialogRef : MatDialogRef<AddBulkUserMemberDialog>,
              private formBuilder : FormBuilder,
              private memberService : MemberService) { }

  ngOnInit() {
    this.addBulkUserForm = this.formBuilder.group({
      bulkUserFile : ['', Validators.required]
    })
  }

  get f() {
    return this.addBulkUserForm.controls;
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
  }

  onSubmit() {
    this.submitted = true;
    if(this.addBulkUserForm.invalid) {
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append("file", this.selectedFile);

    this.memberService.addBulkUser(formData)
    .subscribe(data => {
      this.fileUploadMessage = data.body.result;
      this.loading = false;
      this.delay(3000).then(any => {
        this.dialogRef.close();
      });
    },
    (error : HttpErrorResponse) => {
      this.error = error.error.errorCode + ' ' + error.error.result;
      this.loading = false;
    })
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

}
