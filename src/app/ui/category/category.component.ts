import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { PaginationInstance } from 'ngx-pagination';

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

  @Input('data') meals: string[] = [];

  public config: PaginationInstance = {
    itemsPerPage: 1,
    currentPage: 1
  };

  constructor(
    private scriptsService: ScriptsService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    // this.productsService.getAllProducts(res => {
    //   console.log(res);
    //   this.products = res;
    //  });

    //  this.productsService.getAllCategories(res => {
    //   console.log(res);
    //   this.categories = res;
    //  })
    // this.products = this.productsService.getData();
    // console.log(this.products);

    this.getAllProducts();
    this.getAllCategories();
    this.getAllSolutions();

    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
  }

  getAllProducts() {
    this.productsService.getAllProducts(res => {
      // console.log(res);
      this.productsTemp = res;
      this.products = res;
    });
  }

  getAllCategories() {
    this.productsService.getAllCategories(res => {
      // console.log(res);
      this.categories = res;
    })
  }

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
    this.products = _(this.products).filter({findSolution: true}).value();
  }

}
