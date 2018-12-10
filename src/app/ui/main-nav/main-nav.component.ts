import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  show = false;

  constructor(
    private scriptsService: ScriptsService
  ) { }

  
  ngOnInit() {
    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
  }


  toggleCollapse() {
    this.show = !this.show;
  }

}
