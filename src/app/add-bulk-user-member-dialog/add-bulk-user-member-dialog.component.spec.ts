import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkUserMemberDialog } from './add-bulk-user-member-dialog.component';

describe('AddBulkUserMemberDialogComponent', () => {
  let component: AddBulkUserMemberDialog;
  let fixture: ComponentFixture<AddBulkUserMemberDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBulkUserMemberDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulkUserMemberDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
