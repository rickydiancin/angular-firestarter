import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';
import { Observable } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToProjectComponent } from '../product/add-to-project/add-to-project.component';
import { VariablesService } from 'src/app/core/variables.service';
import * as _ from 'lodash';
import { Title, DomSanitizer } from '@angular/platform-browser';
import { canvasToBlob } from 'blob-util';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  // products: Observable<any[]>;
  products:any = [];
  productsTemp:any = [];
  categories:any;
  solutions:any;
  routeParamsName: any;
  routeParamsid: any;
  category: any;
  solution: any;
  paramsCategory: any;
  paramsSolution: any;
  params: any;
  queryParams: any;
  productsLoaded:boolean = false;
  finalMenu1:any;
  finalMenu2:any;
  finalMenu3:any;
  input:any;
  addToProject: boolean = false;
  isLoggin: Boolean;
  sortValue: any = 'productTitle';

  @Input('data') meals: string[] = [];

  public config: PaginationInstance = {
    itemsPerPage: 12,
    currentPage: 1
  };

  public range = {
    minHeight: '',
    maxHeight: '',
    minWidth: '',
    maxWidth: '',
    minDepth: '',
    maxDepth: '',
  }

  constructor(
    private scriptsService: ScriptsService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public vs: VariablesService,
    public titleService: Title,
    private domSanitizer: DomSanitizer,
    public authService: AuthService,
    private router: Router
  ) { }

  // makeTrustedImage(item) {
  //   const imageString = JSON.stringify(item).replace(/\\n/g, '');
  //   const style = 'url(' + imageString + ')';
  //   return this.domSanitizer.bypassSecurityTrustStyle(style);
  // }

  ngOnInit() {

    console.log(this.sortValue)

    this.finalMenu1 = this.vs.finalMenu1();
    this.finalMenu2 = this.vs.finalMenu2();
    this.finalMenu3 = this.vs.finalMenu3();

    this.route.queryParams.subscribe((queryParams) => {
      if (Object.entries(queryParams).length !== 0) {
        this.titleService.setTitle(`You searched for ${queryParams.s} - Gentec Australia`)
        this.queryParams = queryParams.s;
        this.getAllProducts(queryParams.s);
      }
    })

    this.categories = this.vs.allCategories();

    this.route.params.subscribe(params => {
      if(params) {
        setTimeout(() => {
          this.scriptsService.prepareJquery();
        }, 1000)
      }
      this.params = params
      if (Object.entries(params).length !== 0) {
        this.titleService.setTitle(`Gentec Product Range Archives - Gentec Australia`)
          if(params.id) {
            this.paramsCategory = params.id
            this.productsService.getCategory(params.id, res => {
              this.category = res;
              // console.log("category",this.category );
            });
            this.vs.localstorage('products').subscribe((products: any) => {
              if (products.length) {
                products.forEach(a => {
                  // console.log(a.categories, a.productCode)
                });
                let productList = _(products).filter((value) => {
                    value.categories = value.categories.split(';');
                    return value.categories.includes(params.id)
                  }).value();
                this.products = _(productList).sortBy(this.sortValue).value();
                this.productsTemp = productList;
                this.productsLoaded = true;
                // console.log(this.products)
              }
            })

            // if (this.vs.localstorage('products')) {
            //   // this.products = localStorage.getItem('products');
            //   this.products = _(localStorage.getItem('products')).filter((value:any) => {
            //     return value.categories.includes(params.id)
            //   }).value();
            // } else {
            //   this.productsService.getAllProducts().subscribe((data) => {
            //     this.products = data;
            //     localStorage.setItem('products', JSON.stringify(data));
            //     this.products = _(data).filter((value:any) => {
            //       return value.categories.includes(params.id)
            //     }).value();
            //   })
            // }
            // if (this.vs.localstorage('products')) {
            //   this.products = _(JSON.parse(localStorage.getItem('products'))).filter((value) => {
            //     return value.categories.includes(params.id)
            //   }).value();
            // } else {
            //   this.productsService.getAllProducts().subscribe((res: any) => {
            //     if (res.length) {
            //       this.products = _(res).filter((value) => {
            //         return value.solutions.includes(params.solutionid)
            //       }).value();
            //       localStorage.setItem('products', JSON.stringify(res));
            //     }
            //   });
            // }
          } else if (params.solutionid) {
            this.paramsSolution = params.solutionid;
              this.productsService.getSolution(params.solutionid).subscribe((data) => {
                this.solution = data
              })
            // this.vs.localstorage('solutions').subscribe(res => {
            //   this.solution = _(res).filter((value:any) => {
            //     return value.solutionCode == params.solutionid;
            //   }).value()[0];
            // });
            // if (this.vs.localstorage('products')) {
            //   this.products = _(JSON.parse(localStorage.getItem('products'))).filter((value:any) => {
            //       return value.solutions.includes(params.solutionid)
            //     }).value();
            // } else {
            //   this.productsService.getAllProducts().subscribe((data) => {
            //     // this.products = data;
            //     localStorage.setItem('products', JSON.stringify(data));
            //     this.products = _(localStorage.getItem('products')).filter((value: any) => {
            //       return value.solutions.includes(params.solutionid)
            //     }).value();
            //   })
            // }
            this.vs.localstorage('products').subscribe((products: any) => {
              if (products.length) {
                products.forEach(a => {
                  // console.log(a.solutions, a.productCode)
                });
                let productList = _(products).filter((value) => {
                  value.solutions = value.solutions.split(';').join(',').match(/(?=\S)[^,]+?(?=\s*(,|$))/g);
                  if (value.solutions) {
                    return value.solutions.includes(params.solutionid)
                  }
                }).value();
                this.products = _(productList).sortBy(this.sortValue).value();
                this.productsTemp = productList;
                this.productsLoaded = true;
              }
            })
            // if(this.vs.localstorage('products')) {
            //   this.products = _(JSON.parse(localStorage.getItem('products'))).filter((value) => {
            //     return value.solutions.includes(params.solutionid)
            //   }).value();
            // } else {
            //   this.productsService.getAllProducts().subscribe((res: any) => {
            //     if (res.length) {
            //       this.products = _(res).filter((value) => {
            //         return value.solutions.includes(params.solutionid)
            //       }).value();
            //       localStorage.setItem('products', JSON.stringify(res));

            //       // this.productsService.getAllCategories((resCategory: any) => {
            //       //   this.categories = _(resCategory).filter({ 'parent': '' }).value();
            //       //   console.log(resCategory, this.categories)
            //       // });
            //     }
            //   });
            // }
          } else {
            this.getAllProducts();
          }
      }
      // this.initialiseState(); // reset and set based on new parameter this time
    });
    // this.routeParamsName = this.route.snapshot.params.name;
    // this.routeParamsid = this.route.snapshot.params.id;
    // console.log(this.routeParamsName, this.routeParamsid)
    // this.productsService.getAllProducts(res => {
    //   console.log(res);
    //   this.products = res;
    //  });
    // this.products = this.productsService.getData();
    // console.log(this.products);
      // this.productsService.getCategory(this.routeParamsName.split('.')[1], res => {
      //   console.log(res);
      //   this.category = res;
      // });
    // this.getAllCategories();
    this.getAllSolutions();

    // setTimeout(() => {
    //   this.scriptsService.prepareJquery();
    //    },1000)
  }

  // parseArray(array) {
  //   if (array) {
  //     console.log(array)
  //     return array.join(', ');
  //   }
  // }

  getAllProducts(value?) {
    let result = [];
      this.vs.localstorage('products').subscribe((products: any) => {
        if (products.length) {
          if (!value) {
            this.products = _(products).sortBy(this.sortValue).value();
            this.productsTemp = products;
            this.productsLoaded = true;
          } else {
            this.productsService.getProductsWithCategory(cb => {
              if(cb) {
                setTimeout(() => {
                  result = _.filter(cb, row => row);
                  cb.forEach((cv) => {
                    console.log(cv.categoryName)
                  })
                  console.log(cb)
                  result = _.filter(cb, row => row.productTitle.toString().toLowerCase().indexOf(value) > -1 || row.productCode.toString().toLowerCase().indexOf(value) > -1 || row.categories.toString().toLowerCase().indexOf(value) > -1 || row.categoryName.toString().toLowerCase().indexOf(value) > -1);
                  if (result.length > 0) {
                    this.products = _(result).sortBy(this.sortValue).value();
                    this.productsTemp = result;
                    this.productsLoaded = true;
                  } else {
                    this.products = [];
                    this.productsTemp = [];
                    this.productsLoaded = true;
                  }
                }, 3000);
              }
            });
          }
        }
    })
  }

  // getAllCategories() {
  //   this.productsService.getAllCategories(res => {
  //     console.log(res);
  //     this.categories = res;
  //   })
  // }

  getAllSolutions() {
    this.productsService.getAllSolutions().subscribe((data) => {
      this.solutions = data;
    })
  }

  solutionFilter(value) {
    this.products = this.productsTemp;
    _(this.productsTemp).each((e, index) => {
      this.products[index].findSolution = e.solutions.includes(value);
    });
    this.products = _(this.products).filter({ findSolution: true }).value();
  }

  categoriesFilter(value) {
    this.products = this.productsTemp;
    _(this.productsTemp).each((e, index) => {
      this.products[index].findCategory = e.categories.includes(value);
    });
    this.products = _(this.products).filter({ findCategory: true }).value();
  }

  priceFilter(value) {
    value.split('-');
    let price:number = value.split('-');
    this.products = this.productsTemp;
    this.products = _(this.productsTemp).filter((o) => {
      return o.productPrice >= price[0] && o.productPrice < price[1];
    }).value();
  }

  sortBy(event) {
    console.log(event.target.value)

    // this.products = this.productsTemp;
    this.products = _(this.productsTemp).sortBy([event.target.value]).value();
    console.log(this.products)
  }

  rangeFilter() {
    if(this.range.minHeight && this.range.maxHeight) {
      console.log('height');
      this.products = _(this.products).filter((val) => {
        return (val.height >= this.range.minHeight && val.height <= this.range.maxHeight)
      }).value()
    }
    if (this.range.minWidth && this.range.maxWidth) {
      console.log('width');
      this.products = _(this.products).filter((val) => {
        return (val.width >= this.range.minWidth && val.width <= this.range.maxWidth)
      }).value()
    }
    if (this.range.minDepth && this.range.maxDepth) {
      console.log('depth');
      this.products = _(this.products).filter((val) => {
        return (val.depth >= this.range.minDepth && val.height <= this.range.maxDepth)
      }).value()
    }
  }

  addToProduct(product) {
    if (this.authService.user) {
      const activeModal = this.modalService.open(AddToProjectComponent, { size: 'lg', backdrop: 'static' });
      activeModal.componentInstance.product = product
      activeModal.result.then((result) => {
        this.vs.showAddProjectModal = result.value
      })
    } else {
      this.router.navigate(['/login'])
    }
    // const activeModal = this.modalService.open(AddToProjectComponent, { size: 'lg', backdrop: 'static' });
    // activeModal.componentInstance.product = product
    // activeModal.result.then((result) => {
    //   this.vs.showAddProjectModal = result.value
    // })
  }

  getAllCategoryProducts(id) {
    this.productsService.getAllCategoryProducts(id).subscribe(async (res: any) => {
      this.products = res;

    });
  }

}
