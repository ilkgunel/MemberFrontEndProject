import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminMemberComponent } from './add-admin-member.component';

describe('AddAdminMemberComponent', () => {
  let component: AddAdminMemberComponent;
  let fixture: ComponentFixture<AddAdminMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdminMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
