import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  categories:any;

  constructor(
    private scriptsService: ScriptsService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
       this.productsService.getAllCategories(res => {
        console.log(res);
        this.categories = res;
       })
  }

}
