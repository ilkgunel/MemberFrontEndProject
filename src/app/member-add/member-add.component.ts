import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent implements OnInit {
  memberAddForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.memberAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  get f() { 
    return this.memberAddForm.controls; 
  }

  onSubmit() {
    this.submitted = true;

    console.log('tıklama ulaştı!');

    // stop here if form is invalid
    if (this.memberAddForm.invalid) {
      return;
    }

    this.loading = true;

  }

}
