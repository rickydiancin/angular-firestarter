import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { AuthService } from 'src/app/core/auth.service';
import { ProductsService } from 'src/app/core/products.service';
import * as _ from 'lodash';
import { AngularFireAuth } from '@angular/fire/auth';
import { VariablesService } from 'src/app/core/variables.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  filterQuery = '';

  show = false;
  categories:any;
  menus:any;
  menus2:any;
  menus3:any;
  menuparent:any;
  finalMenu1:any;
  finalMenu2:any;
  finalMenu3:any;
  products:any = [];
  solutions:any;
  user: any;
  
  constructor(
    private scriptsService: ScriptsService,
    public auth: AuthService,
    private productsService: ProductsService,
    public af: AngularFireAuth,
    public vs: VariablesService,
    private router: Router,
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

    $('.b-dropdown_wrapper').click(function () {
      $(this).find('.b-dropdown_content').css('visibility', 'hidden');
      $(this).find('.b-dropdown_content').css('opacity', '0');
      setTimeout(() => {
        $(this).find('.b-dropdown_content').css('visibility', '');
        $(this).find('.b-dropdown_content, .p-relative').css('opacity', '');
      }, 1000);
    });


    this.getAllProducts();
    
    console.log(this.auth.user);
    this.menus = this.vs.allMenus();
    this.menus2 = this.vs.allMenus2();
    this.menus3 = this.vs.allMenus3();
    this.menuparent = this.vs.allParent();
    this.finalMenu1 = this.vs.finalMenu1();
    this.finalMenu2 = this.vs.finalMenu2();
    this.finalMenu3 = this.vs.finalMenu3();
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

    this.vs.localstorage('solutions').subscribe((solutions) => {
      this.solutions = _.orderBy(solutions, ['order'], ['asc']);
      // this.solutions = solutions;
      // console.log(solutions)

    })
    // if(this.vs.localstorage('solutions')) {
    //   this.solutions = JSON.parse(localStorage.getItem('solutions'));
    // } else {
    //   this.productsService.getAllSolutions().subscribe((data) => {
    //     if(data.length) {
    //       this.solutions = data;
    //       localStorage.setItem('solutions', JSON.stringify(data));
    //     }
    //   })
    // }

    // console.log(this.auth.user);
       this.vs.localstorage('products').subscribe(res => {
        // console.log(res);
        this.vs.products = res;
       });
    // if (this.vs.localstorage('products')) {
    //   this.vs.products = JSON.parse(localStorage.getItem('products'));
    // } else {
    //   this.productsService.getAllProducts().subscribe((data) => {
    //     this.vs.products = data;
    //     localStorage.setItem('products', JSON.stringify(data));
    //   })
    // }
  }

  getAllProducts() {
    this.vs.localstorage('products').subscribe((products:any) => {
     // console.log(products);
      if(products.length) {
        _(products).each(async (a: any, b) => {
          a.categories = await a.categories.split(';');
          let c = [];
          await _(a.categories).each(async (j: any, k) => {
            if (j) {
                if (j) {
                  await c.push(j.split('_').join(' ').toLowerCase())
                  if (c.length) {
                    products[b].categoryName = await c;
                    this.products = await products;
                  }
                }
              // })
            }
          })
        })
      }
    });
    // if (this.vs.localstorage('products')) {
    //   this.products = JSON.parse(localStorage.getItem('products'));
    // } else {
    //   this.productsService.getAllProducts().subscribe((data) => {
    //     this.products = data;
    //     localStorage.setItem('products', JSON.stringify(data));
    //   })
    // }
  }
  logout() {
    console.log('logout...');
    this.auth.signOut();
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  search(value?) {
    if (value) {
      this.router.navigate(['/products'], { queryParams: { s: value.toLowerCase() } }).then(() => {
        this.filterQuery = '';
      })
    } else {
      this.router.navigate(['/products'], { queryParams: { s: this.filterQuery } }).then(() => {
        this.filterQuery = '';
      })
    }
  }

}
