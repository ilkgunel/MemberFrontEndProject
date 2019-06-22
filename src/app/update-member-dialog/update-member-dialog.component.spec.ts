import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemberDialog } from './update-member-dialog.component';

describe('UpdateMemberDialog', () => {
  let component: UpdateMemberDialog;
  let fixture: ComponentFixture<UpdateMemberDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMemberDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMemberDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
