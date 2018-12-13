import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private scriptsService: ScriptsService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
  }

}
