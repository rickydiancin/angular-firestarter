import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { PaginationInstance } from 'ngx-pagination';
import { ActivatedRoute } from '@angular/router';

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

  @Input('data') meals: string[] = [];

  public config: PaginationInstance = {
    itemsPerPage: 9,
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
  ) { }

  ngOnInit() {
    // this.routeParamsName = this.route.snapshot.params.name;
    // this.routeParamsid = this.route.snapshot.params.id;
    // console.log(this.routeParamsName, this.routeParamsid)
    // this.productsService.getAllProducts(res => {
    //   console.log(res);
    //   this.products = res;
    //  });
    // this.products = this.productsService.getData();
    // console.log(this.products);

      this.getAllProducts();
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
    this.productsService.getAllProducts().subscribe(async (res:any) => {
      console.log(res)
      this.productsTemp = res;
      this.products = res;
      this.productsService.getAllCategories((resCategory:any) => {
        this.categories = _.find(resCategory, {'sub': null});
        console.log(resCategory, this.categories)
        // console.log(_.size())
        // _(resCategory).each((value, index) => {
        //   let products = [];
        //   this.productsService.getProductByArray(value.categoryCode).subscribe((product) => {
        //     products.push(product);
        //     this.categories[index].products = products[0];
        //   });
        // });
        // _(res).each((value: any, index) => {
        //   let cat = [];
        //   value.categories.map((category, index2) => {
        //     // console.log(_(this.categories).filter({ categoryCode: category }).value()[0].categoryName)
        //     cat.push(_(resCategory).filter({ categoryCode: category }).value()[0]['categoryName']);
        //     this.products[index].categoryName = cat;
        //     if(cat) {
        //       this.productsTemp[index].categoryName = cat.join(', ');
        //     }
        //   })
        // })
      })
      // if (this.categories && this.productsTemp) {
        //   await _(res).each((value:any, index) => {
          //     let cat = [];
          //     value.categories.map((category, index2) => {
            //       // console.log(_(this.categories).filter({ categoryCode: category }).value()[0].categoryName)
            //       cat.push(_(this.categories).filter({ categoryCode: category }).value()[0]['categoryName']);
            //       this.products[index].categoryName = cat;
            //       this.productsTemp[index].categoryName = cat;
            //     })
            //   })
            // }
            console.log(res);
    });
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

  sortBy(value) {

    // this.products = this.productsTemp;
    this.products = _(this.productsTemp).sortBy(value).value();
  }

  rangeFilter() {
    if(this.range.minHeight && this.range.maxHeight) {
      console.log('height');
    }
    if (this.range.minWidth && this.range.maxWidth) {
      console.log('width');
    }
    if (this.range.minDepth && this.range.maxDepth) {
      console.log('depth');
    }
  }

}
