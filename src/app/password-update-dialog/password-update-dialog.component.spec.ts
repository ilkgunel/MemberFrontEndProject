import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordUpdateDialog } from './password-update-dialog.component';

describe('PasswordUpdateDialogComponent', () => {
  let component: PasswordUpdateDialog;
  let fixture: ComponentFixture<PasswordUpdateDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordUpdateDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordUpdateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
