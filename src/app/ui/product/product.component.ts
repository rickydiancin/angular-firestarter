import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Observable<any[]>;
  content: string;

  constructor(
    private scriptsService: ScriptsService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.products = this.productsService.getData();
    console.log(this.products);
    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
  }

}
