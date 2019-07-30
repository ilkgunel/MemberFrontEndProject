import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordMailDialog } from './reset-password-mail-dialog.component';

describe('ResetPasswordMailDialogComponent', () => {
  let component: ResetPasswordMailDialog;
  let fixture: ComponentFixture<ResetPasswordMailDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordMailDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordMailDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
