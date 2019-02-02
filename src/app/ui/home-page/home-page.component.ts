import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public model: string;
  // states: string[] = [];

  categories: any;
  products:any;
  posts:any;
  abouts:any;
  products2:any;
  banners:any;
  solutions:any;

  constructor(
    private scriptsService: ScriptsService,
    private productsService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.scriptsService.prepareJquery();
    }, 1000)
    this.productsService.getAllCategories(res => {
      console.log(res);
      this.categories = res;
    });
    this.productsService.getAllProducts().subscribe(res => {
      console.log(res);
      this.products = res;
     });
     this.productsService.getAllPosts().subscribe(res => {
      console.log(res);
      this.posts= res;
     });
     this.productsService.getAllAbout().subscribe(res => {
      console.log(res);
      this.abouts= res;
     });
     this.productsService.getAllBanners().subscribe(res => {
      console.log('banners: ',res);
      this.banners = res;
     });
     this.productsService.getAllSolutions().subscribe((data) => {
      this.solutions = data;
    })
     this.productsService.getData().subscribe(res => {
      console.log('latest products: ',res);
      this.products2 = res;
     });
  }

  onSelect(event: TypeaheadMatch): void {
    console.log(event)
    this.router.navigate(['/product/' + event.item.productCode]);
  }

}
