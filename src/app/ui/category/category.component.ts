import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';
import { Observable } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToProjectComponent } from '../product/add-to-project/add-to-project.component';
import { VariablesService } from 'src/app/core/variables.service';
import * as _ from 'lodash';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  // products: Observable<any[]>;
  products:any = [];
  productsTemp:any;
  categories:any;
  solutions:any;
  routeParamsName: any;
  routeParamsid: any;
  category: any;
  solution: any;
  paramsCategory: any;
  paramsSolution: any;
  params: any;

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
    public vs: VariablesService
  ) { }

  ngOnInit() {

    this.categories = this.vs.allCategories();
    console.log(this.route.snapshot.params.id)

    this.route.params.subscribe(params => {
      console.log(params)
      this.params = params
      if (Object.entries(params).length !== 0) {
          if(params.id) {
            this.paramsCategory = params.id
            console.log(this.paramsCategory)
            this.productsService.getCategory(params.id, res => {
              console.log(res);
              this.category = res;
            });
            this.vs.localstorage('products').subscribe((products: any) => {
              if (products.length) {
                // this.products = products;
                // console.log(this.products)
                this.products = _(products).filter((value) => {
                    return value.categories.includes(params.id)
                  }).value();
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
                // this.products = products;
                // console.log(this.products)
                this.products = _(products).filter((value) => {
                  return value.solutions.includes(params.solutionid)
                }).value();
              }
            })
            if(this.vs.localstorage('products')) {
              this.products = _(JSON.parse(localStorage.getItem('products'))).filter((value) => {
                return value.solutions.includes(params.solutionid)
              }).value();
            } else {
              this.productsService.getAllProducts().subscribe((res: any) => {
                if (res.length) {
                  this.products = _(res).filter((value) => {
                    return value.solutions.includes(params.solutionid)
                  }).value();
                  localStorage.setItem('products', JSON.stringify(res));

                  // this.productsService.getAllCategories((resCategory: any) => {
                  //   this.categories = _(resCategory).filter({ 'parent': '' }).value();
                  //   console.log(resCategory, this.categories)
                  // });
                }
              });
            }
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

    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
  }

  // parseArray(array) {
  //   if (array) {
  //     console.log(array)
  //     return array.join(', ');
  //   }
  // }

  getAllProducts() {
    console.log(this.vs.localstorage('products'))
    this.vs.localstorage('products').subscribe((products:any) => {
      if (products.length) {
        this.products = products;
        this.productsTemp = products;
        console.log(this.productsTemp)
        
      }
    })
    // if (this.vs.localstorage('products')) {
    //   console.log('true', JSON.parse(localStorage.getItem('products')));
    //   this.products = JSON.parse(localStorage.getItem('products'));
    // } else {
    //   this.productsService.getAllProducts().subscribe((res: any) => {
    //     if(res.length) {
    //       this.products = res;
    //       console.log(res)
    //       localStorage.setItem('products', JSON.stringify(res));
    //       this.productsService.getAllCategories((resCategory: any) => {
    //         this.categories = _(resCategory).filter({ 'parent': '' }).value();
    //         console.log(resCategory, this.categories)
    //       });
    //     }
    //   });
    // }
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
    // $('#b-promo_popup').modal('show');
    const activeModal = this.modalService.open(AddToProjectComponent, { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.product = product
    activeModal.result.then((result) => {
      this.vs.showAddProjectModal = result.value
    })
  }

  getAllCategoryProducts(id) {
    this.productsService.getAllCategoryProducts(id).subscribe(async (res: any) => {
      this.products = res;
    });
  }

}
