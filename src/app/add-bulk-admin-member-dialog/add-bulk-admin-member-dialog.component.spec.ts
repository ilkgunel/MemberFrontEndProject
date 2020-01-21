import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkAdminMemberDialog } from './add-bulk-admin-member-dialog.component';

describe('AddBulkAdminMemberDialogComponent', () => {
  let component: AddBulkAdminMemberDialog;
  let fixture: ComponentFixture<AddBulkAdminMemberDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBulkAdminMemberDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulkAdminMemberDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
