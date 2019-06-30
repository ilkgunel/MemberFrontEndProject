import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMemberDialog } from './delete-member-dialog.component';

describe('DeleteMemberDialog', () => {
  let component: DeleteMemberDialog;
  let fixture: ComponentFixture<DeleteMemberDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMemberDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMemberDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
