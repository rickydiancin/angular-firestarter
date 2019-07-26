import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { AuthService } from 'src/app/core/auth.service';
import { ProductService } from 'src/app/core/products.service';
import * as _ from 'lodash';
import { AngularFireAuth } from '@angular/fire/auth';
import { VariablesService } from 'src/app/core/variables.service';
import { Router } from '@angular/router';
import { SolutionService } from 'src/app/core/solution.service';
import { MenuService } from 'src/app/core/menu.service';
import { TokenService } from 'src/app/core/token.service';
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
  finalMenu1:any = [];
  finalMenu2:any = [];
  finalMenu3:any = [];
  products:any = [];
  solutions:any = [];
  user: any;
  finalMenu1Loader: boolean;
  finalMenu3Loader: boolean;
  finalMenu2Loader: boolean;
  solutionLoader: boolean = false;
  companies: any;
  menu1: any;
  menu2: any;
  menu3: any;
  
  cookieExists: boolean;
  
  constructor(
    private scriptsService: ScriptsService,
    public auth: AuthService,
    private productService: ProductService,
    public af: AngularFireAuth,
    public vs: VariablesService,
    private router: Router,
    private solutionService: SolutionService,
    private menuService: MenuService,
    private tokenService: TokenService
  ) {

    this.cookieExists = tokenService.checkToken();
    // this.af.authState.subscribe((auth) => {
      
    //   if(auth) {
    //     console.log(auth, 'auth')
    //     this.user = auth;
    //   } else {
    //     console.log(auth, 'notAuth')
    //     this.user = '';
    //   }
    // })
    // this.vs.sampleApi().subscribe((res) => {
    //   console.log(res)
    // })
  }

  GetAllSolutions() {
    this.solutionLoader = true;
    this.menuService.GetSingleMenu('5d3981e331876d2aa4a48eef').subscribe((res: any) => {
      this.solutions = res;
      this.solutionLoader = false;
    })
  }

  GetAllCategory() {
    // this. = true;
    this.menuService.GetSingleMenuCategory('5d39535f446a1905344c5aaf').subscribe((res: any) => {
      this.menu1 = res;
    });

    this.menuService.GetSingleMenuCategory('5d398fc8292f0d2b98c8810f').subscribe((res: any) => {
      this.menu2 = res;
    });

    this.menuService.GetSingleMenuCategory('5d398fcf292f0d2b98c88113').subscribe((res: any) => {
      this.menu3 = res;
    });
  }
  
  ngOnInit() {

    this.GetAllSolutions();
    this.GetAllCategory();

    // this.vs.sampleApi().subscribe((res) => {
    //   console.log(res)
    // })

    $('.b-dropdown_wrapper').click(function () {
      $(this).find('.b-dropdown_content').css('visibility', 'hidden');
      $(this).find('.b-dropdown_content').css('opacity', '0');
      setTimeout(() => {
        $(this).find('.b-dropdown_content').css('visibility', '');
        $(this).find('.b-dropdown_content, .p-relative').css('opacity', '');
      }, 1000);
    });


    // this.getAllProducts();
    
    // console.log(this.auth.user);
    // this.menus = this.vs.allMenus();
    // this.menus2 = this.vs.allMenus2();
    // this.menus3 = this.vs.allMenus3();
    // this.menuparent = this.vs.allParent();
    // this.finalMenu1 = this.vs.finalMenu1('menu1');
    // this.finalMenu2 = this.vs.finalMenu2();
    // this.finalMenu3 = this.vs.finalMenu3();
    // this.categories = this.vs.allCategories();
    

    // this.vs.finalMenu1('B4iC2Z0RuYrw0Ou5kPQt').subscribe((res:any) => {
    //   if(res) {
    //     this.finalMenu1 = res.value;
    //     this.finalMenu1Loader = true;
    //     console.log(res)
    //   }
    // })

    // this.vs.finalMenu1('NZO8GjZHIJkgCPfJodK1').subscribe((res:any) => {
    //   if (res) {
    //     this.finalMenu2 = res.value;
    //     this.finalMenu2Loader = true;
    //     console.log(res)
    //   }
    // })
    
    // this.vs.finalMenu1('z1VRPA9NlRemMi5pAJ2o').subscribe((res:any) => {
    //   if(res) {
    //     this.finalMenu3 = res.value;
    //     this.finalMenu3Loader = true;
    //     console.log(res)
    //   }
    // })

    // this.vs.solutionsMenu('Uw15tgHZg4O2SKUGhnwu').subscribe((menu:any) => {
    //   if(menu) {
    //     menu.value.forEach(element => {
    //       this.vs.solutions(element).subscribe((res:any) => {
    //         if(res) {
    //           this.solutions.push(res)
    //         }
    //       })
    //     });
    //     this.solutionLoader = true
    //   }
    // })

    // this.solutionService.GetAllSolutions().subscribe((res: any) => {
    //   this.solutions = res;
    // })
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

    // this.vs.localstorage('solutions').subscribe((solutions) => {
    //   this.solutions = _.orderBy(solutions, ['order'], ['asc']);
    //   // this.solutions = solutions;
    //   // console.log(solutions)

    // })
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
      //  this.vs.localstorage('products').subscribe(res => {
      //   // console.log(res);
      //   this.vs.products = res;
      //  });
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
    if (!this.products.length) {
      this.vs.localstorage('products').subscribe((products: any) => {
        // console.log(products);
        if (products.length) {
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
    }
  }
  logout() {
    // console.log('logout...');
    // this.auth.signOut();
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  search() {
    if (this.filterQuery.length) {
      this.router.navigate(['/catalogue/search'], { queryParams: { s: this.filterQuery.toLowerCase() } }).then(() => {
        this.filterQuery = '';
      })
    }
  }

}
