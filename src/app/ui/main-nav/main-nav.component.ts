import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  show = false;

  constructor(
    private scriptsService: ScriptsService,
    public auth: AuthService
  ) { }

  
  ngOnInit() {
    console.log(this.auth.user);
    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
  }

  logout() {
    console.log('logout...');
    this.auth.signOut();
  }

  toggleCollapse() {
    this.show = !this.show;
  }

}
