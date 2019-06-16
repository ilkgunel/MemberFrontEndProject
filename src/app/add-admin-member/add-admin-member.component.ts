import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/services/member.service';
import { first, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OperationResult } from 'src/interface/operationResult';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError, of } from 'rxjs';

@Component({
  selector: 'app-add-admin-member',
  templateUrl: './add-admin-member.component.html',
  styleUrls: ['./add-admin-member.component.css']
})
export class AddAdminMemberComponent implements OnInit {

  memberAddForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  private operationResult : OperationResult;

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private router: Router
  ) { }

  ngOnInit() {
    this.memberAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email:['',Validators.required],
      memberLanguageCode:['tr',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    });
  }

  get f() { 
    return this.memberAddForm.controls; 
  }

  onSubmit() {
    this.submitted = true;
    let data = {};
    // stop here if form is invalid
    if (this.memberAddForm.invalid) {
      return;
    }

    this.loading = true;

    this.memberService.addAdminMembers(this.memberAddForm.value) 
      .subscribe(
        data => {
          console.log("data");
          console.log(data);
          this.router.navigate(['member-list']);
        },
        (error:HttpErrorResponse) => {
          this.error = error.error.errorCode + " " + error.error.result;
          this.loading = false;
        }
      );
  }

}
