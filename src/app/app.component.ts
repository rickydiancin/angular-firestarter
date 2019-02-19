import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { ProductsService } from './core/products.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { ScriptsService } from './core/scripts.service';
import { VariablesService } from './core/variables.service';

declare var $: any;

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

  constructor(private auth: AuthService, public productsService: ProductsService, private router: Router, public scriptsService: ScriptsService, private vs: VariablesService) {}

  getAllProducts() {
    this.vs.localstorage('products').subscribe((products) => {
      this.products = products;
    });
  }

  onSelect(event: TypeaheadMatch): void {
    console.log(event)
    this.router.navigate(['/product/' + event.item.productCode]);
    $("#b-close_search").click();
  }

  ngOnInit() {

    this.footerMenus = this.vs.footer();

    this.getAllProducts();
    this.getAllSolution();
    setTimeout(() => {
      this.scriptsService.prepareJquery();
    }, 1000)
  }

  getAllSolution() {
    this.vs.localstorage('solutions').subscribe((solutions) => {
      this.solutions = solutions;
    })
  }
}
