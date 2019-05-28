import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserMemberComponent } from './add-user-member.component';

describe('AddUserMemberComponent', () => {
  let component: AddUserMemberComponent;
  let fixture: ComponentFixture<AddUserMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
