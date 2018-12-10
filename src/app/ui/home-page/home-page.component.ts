import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private scriptsService: ScriptsService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
  }

}
