import { Component, OnInit } from "@angular/core";
import { MemberService } from 'src/services/member.service';


@Component({
    selector: 'member-list',
    templateUrl: './member-list.component.html',
    styles: []
})
export class MemberListComponent implements OnInit{
    public members = [];
    public errorMsg;
    constructor(private _memberService : MemberService){}
    ngOnInit() {
      console.log('ngOnInit çalıştı!');
      this._memberService.getMembers().subscribe(data => this.members = data);
      console.log('ngOnInit bitti!');
      console.log(this.members);
    }

  public clickMe() {
    console.log("clicked");
  }
}
