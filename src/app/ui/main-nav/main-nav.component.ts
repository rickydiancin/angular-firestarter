import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { AuthService } from 'src/app/core/auth.service';
import { ProductsService } from 'src/app/core/products.service';
import * as _ from 'lodash';
import { AngularFireAuth } from '@angular/fire/auth';
import { VariablesService } from 'src/app/core/variables.service';

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
  user: any;
  
  constructor(
    private scriptsService: ScriptsService,
    public auth: AuthService,
    private productsService: ProductsService,
    public af: AngularFireAuth,
    public vs: VariablesService
  ) {
    // this.af.authState.subscribe((auth) => {
      
    //   if(auth) {
    //     console.log(auth, 'auth')
    //     this.user = auth;
    //   } else {
    //     console.log(auth, 'notAuth')
    //     this.user = '';
    //   }
    // })
  }

  
  ngOnInit() {
    console.log(this.auth.user);
    this.categories = this.vs.allCategories();
    // this.auth.user.subscribe((data) => {
    //   // console.log(data)
    //   if (data === null) {
    //     console.log('logout');
    //   } else {
    //     this.user = data
    //   }
    // })

    // this.productsService.getAllCategories(res => {
      // this.categories = res;
      // this.categories = _(res).filter({ 'parent': '' }).value();;
      // console.log(res)
      // _(res).each((value, index) => {
      //   // console.log(value.categoryCode)
      //   let products = [];
      //   this.productsService.getProductByArray(value.categoryCode).subscribe((product) => {
      //     products.push(product);
      //     this.categories[index].products = products[0];
      //     // console.log(products[0])
      //   });
      // });
    // });
    // console.log(this.categories);

    this.productsService.getAllSolutions().subscribe((data) => {
      this.solutions = data;
    })

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
    console.log('logout...');
    this.auth.signOut();
  }

  toggleCollapse() {
    this.show = !this.show;
  }

}
