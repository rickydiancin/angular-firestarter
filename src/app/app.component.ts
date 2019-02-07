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
  constructor(private auth: AuthService, public productsService: ProductsService, private router: Router, public scriptsService: ScriptsService, private vs: VariablesService) {}

  getAllProducts() {
    if(this.vs.localstorage('products')) {
      this.products = JSON.parse(localStorage.getItem('products'));
    } else {
      this.productsService.getAllProducts().subscribe(res => {
        this.products = res;
        localStorage.setItem('products', JSON.stringify(res));
      });
    }
  }

  onSelect(event: TypeaheadMatch): void {
    console.log(event)
    this.router.navigate(['/product/' + event.item.productCode]);
    $("#b-close_search").click();
  }

  ngOnInit() {
    this.getAllProducts();
    setTimeout(() => {
      this.scriptsService.prepareJquery();
    }, 1000)
  }
}
