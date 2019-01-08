import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  // products: Observable<any[]>;
  products:any;
  categories:any;

  constructor(
    private scriptsService: ScriptsService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.productsService.getAllProducts(res => {
      console.log(res);
      this.products = res;
     });

     this.productsService.getAllCategories(res => {
      console.log(res);
      this.categories = res;
     })
    // this.products = this.productsService.getData();
    // console.log(this.products);
    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
  }

}
