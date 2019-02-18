import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/core/variables.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/core/post.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public model: string;
  // states: string[] = [];
  filterQuery = '';

  categories: any;
  products:any;
  posts:any;
  abouts:any;
  products2:any;
  banners:any;
  solutions:any;
  form: any;

  constructor(
    private scriptsService: ScriptsService,
    private productsService: ProductsService,
    private router: Router,
    public vs: VariablesService,
    public formBuilder: FormBuilder,
    public postService: PostService,
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      subject: [''],
      message: ['']
    })
  }

  ngOnInit() {
      setTimeout(() => {
        this.scriptsService.prepareJquery();
      }, 1000)
    this.productsService.getAllCategories(res => {
      console.log(res);
      this.categories = res;
    });
    
    this.postService.getAllPostsByCategory('news').subscribe(res => {
      console.log(res);
      this.posts= res;
     });
    this.postService.getAllPostsByCategory('about').subscribe(res => {
      console.log(res);
      this.abouts= res;
     });
     this.vs.localstorage('banners').subscribe(res => {
      console.log('banners: ',res);
      this.banners = res;
     });
    //  this.productsService.getAllBanners().subscribe(res => {
    //   console.log('banners: ',res);
    //   this.banners = res;
    //  });
    //  this.productsService.getAllSolutions().subscribe((data) => {
    //   this.solutions = data;
    // })
     this.productsService.getData().subscribe(res => {
      console.log('latest products: ',res);
      this.products2 = res;
     });
    this.getAllProducts();
    this.getAllSolutions();
  }

  getAllSolutions() {
    this.vs.localstorage('solutions').subscribe((solutions) => {
      this.solutions = solutions;
    });
    // if(this.vs.localstorage('solutions')) {
    //   this.solutions = JSON.parse(localStorage.getItem('solutions'));
    // } else {
    //   this.productsService.getAllSolutions().subscribe((data) => {
    //     this.solutions = data;
    //     localStorage.setItem('solutions', JSON.stringify(data));
    //   })
    // }
  }

  getAllProducts() {
    this.vs.localstorage('products').subscribe((products) => {
      this.products = products
    });
    // if (this.vs.localstorage('products')) {
    //   this.products = JSON.parse(localStorage.getItem('products'));
    // } else {
    //   this.productsService.getAllProducts().subscribe((data) => {
    //     this.products = data;
    //     localStorage.setItem('products', JSON.stringify(data));
    //   })
    // }
  }

  onSelect(event: TypeaheadMatch): void {
    console.log(event)
    this.router.navigate(['/product/' + event.item.productCode]);
  }

  sendContact() {
    this.form.value.isActive = true;
    this.form.value.dateCreated = Date.now();
    this.productsService.createInquires(this.form.value).then((success) => {
      if(success) {
        this.form.reset();
      }
    })
  }

}
