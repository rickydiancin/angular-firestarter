import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { AuthService } from 'src/app/core/auth.service';
import { ProductsService } from 'src/app/core/products.service';
import * as _ from 'lodash';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  show = false;
  categories:any;
  products:any;
  
  constructor(
    private scriptsService: ScriptsService,
    public auth: AuthService,
    private productsService: ProductsService
  ) { }

  
  ngOnInit() {
    this.productsService.getAllCategories(res => {
      this.categories = res;
      _(res).each((value, index) => {
        console.log(value.categoryCode)
        let products = [];
        this.productsService.getProductByArray(value.categoryCode).subscribe((product) => {
          products.push(product);
          this.categories[index].products = products[0];
          // console.log(products[0])
        });
      });
    });
    console.log(this.categories);

    // console.log(this.auth.user);
    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
       this.productsService.getAllProducts().subscribe(res => {
        // console.log(res);
        this.products = res;
       });
  }

  logout() {
    // console.log('logout...');
    this.auth.signOut();
  }

  toggleCollapse() {
    this.show = !this.show;
  }

}
