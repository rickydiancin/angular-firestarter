import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { AuthService } from 'src/app/core/auth.service';
import { ProductsService } from 'src/app/core/products.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  show = false;
  categories:any;
  products:any;
  solutions:any;
  
  constructor(
    private scriptsService: ScriptsService,
    public auth: AuthService,
    private productsService: ProductsService
  ) { }

  
  ngOnInit() {
    this.productsService.getAllCategories(res => {
      console.log(res);
      this.categories = res;
     })

      this.productsService.getAllSolutions().subscribe((data) => {
        this.solutions = data;
      })
  

    console.log(this.auth.user);
    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
       this.productsService.getAllProducts(res => {
        console.log(res);
        this.products = res;
       });
  }

  logout() {
    console.log('logout...');
    this.auth.signOut();
  }

  toggleCollapse() {
    this.show = !this.show;
  }

}
