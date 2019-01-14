import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Observable<any[]>;
  content: string;
  pid: string;
  theproduct: string;
  constructor(
    private scriptsService: ScriptsService,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pid = this.route.snapshot.params.id;
    this.products = this.productsService.getData();
    console.log(this.products);
    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
       this.productsService.getProduct(this.pid).valueChanges()
       .subscribe(res => {
        console.log(res);
        this.theproduct = res;
      });
  }

}
