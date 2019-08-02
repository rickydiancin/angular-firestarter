import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { ProductService } from './core/products.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { ScriptsService } from './core/scripts.service';
import { VariablesService } from './core/variables.service';
import { MenuService } from './core/menu.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  products: any;
  model:any;
  solutions:any;
  footerMenus:any;
  filterQuery:any;
  footer1: any;
  footer2: any;
  footer3: any;

  constructor(
    private auth: AuthService,
    public productsService: ProductService,
    private router: Router,
    public scriptsService: ScriptsService,
    private vs: VariablesService,
    private menuService: MenuService
    ) {}

  getAllProducts() {
    // this.vs.localstorage('products').subscribe((products) => {
    //   this.products = products;
    // });
  }

  onSelect(event: TypeaheadMatch): void {
    console.log(event)
    this.router.navigate(['/product/' + event.item.productCode]);
    // $("#b-close_search").click();
  }

  ngOnInit() {

    this.menuService.GetOneMenu('5d414b34a3a4161bd859fe2d').subscribe((res: any) => {
      this.footer1 = res;
    })
    this.menuService.GetOneMenu('5d414b3ba3a4161bd859fe2f').subscribe((res: any) => {
      // console.log(res)
      this.footer2 = res;
    })
    this.menuService.GetOneMenu('5d414b42a3a4161bd859fe31').subscribe((res: any) => {
      // console.log(res)
      this.footer3 = res;
    })

    // this.footerMenus = this.vs.footer();

    // this.getAllProducts();
    // this.getAllSolution();
    // setTimeout(() => {
     // this.scriptsService.prepareJquery();
    // }, 1000)
  }

  getAllSolution() {
    // this.vs.localstorage('solutions').subscribe((solutions) => {
    //   this.solutions = solutions;
    // })
  }

  search(value?) {
    if (value) {
      this.router.navigate(['/products'], { queryParams: { s: value.toLowerCase() } })
    } else {
      this.router.navigate(['/products'], { queryParams: { s: this.filterQuery } });
      // $("#b-search_toggle i").addClass('icon-magnifier');
      // $("#b-search_toggle i").removeClass('icon-magnifier-remove');
      // $(".b-search_popup").css('top', '');
      // $(".b-search_popup").css('height', '');
      $('body').toogleClass('b-search_open');
    }
  }
}
