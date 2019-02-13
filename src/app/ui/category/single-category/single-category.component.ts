import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/products.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import * as _ from 'lodash';

@Component({
  selector: 'single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit {

  products: any = [];
  productsTemp: any;
  categories: any;
  solutions: any;
  routeParamsName: any;
  routeParamsid: any;
  category: any;
  id: any;

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
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.param = params['yourParam'];
      console.log(params)
      this.getAllCategoryProducts(params.id);
      this.getCategory(params.id);
      // this.initialiseState(); // reset and set based on new parameter this time
    });
    // this.id = this.route.snapshot.params.id;
    // this.getCategory();
    // this.getAllCategories();
  }

  getCategory(id) {
    this.productsService.getCategory(id, res => {
      console.log(res);
      this.category = res;
    });
  }
  sortBy(data:any){

  }
  rangeFilter(){

  }
  priceFilter(data:any){
    
  }
  getAllCategoryProducts(id) {
    this.productsService.getAllCategoryProducts(id).subscribe(async (res: any) => {
      console.log(res)
      // await this.getAllCategories();
      // console.log(res);
      this.productsTemp = res;
      this.products = res;
      // this.productsService.getAllCategories(resCategory => {
      //   this.categories = _(resCategory).filter({'sub': null || undefined});
      //   // _(resCategory).each((value, index) => {
      //   //   let products = [];
      //   //   this.productsService.getProductByArray(value.categoryCode).subscribe((product) => {
      //   //     products.push(product);
      //   //     this.categories[index].products = products[0];
      //   //   });
      //   // });
      //   // _(res).each((value: any, index) => {
      //   //   let cat = [];
      //   //   value.categories.map((category, index2) => {
      //   //     // console.log(_(this.categories).filter({ categoryCode: category }).value()[0].categoryName)
      //   //     cat.push(_(resCategory).filter({ categoryCode: category }).value()[0]['categoryName']);
      //   //     this.products[index].categoryName = cat;
      //   //     if (cat) {
      //   //       this.productsTemp[index].categoryName = cat.join(', ');
      //   //     }
      //   //   })
      //   // })
      // })
      console.log(res);
    });
  }

  getAllCategories() {
    this.productsService.getAllCategories(resCategory => {
      this.categories = _(resCategory).filter({ 'parent': '' }).value();
      console.log('categories', this.categories)
    })
  }

}
