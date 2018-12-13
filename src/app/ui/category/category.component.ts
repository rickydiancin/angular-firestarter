import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    private scriptsService: ScriptsService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
  }

}
