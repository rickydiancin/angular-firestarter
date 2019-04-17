import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { VariablesService } from 'src/app/core/variables.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/core/post.service';
import { Title } from '@angular/platform-browser';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToProjectComponent } from '../product/add-to-project/add-to-project.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map } from 'rxjs/operators';

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
  products:any = [];
  posts:any;
  abouts:any;
  products2:any;
  banners:any;
  solutions:any;
  form: any;
  fragment: string;
  addToProject: boolean = true;
  isLoggin: Boolean;

  constructor(
    private scriptsService: ScriptsService,
    private productsService: ProductsService,
    private router: Router,
    public vs: VariablesService,
    public formBuilder: FormBuilder,
    public postService: PostService,
    private titleService: Title,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private afAuth: AngularFireAuth
  ) {
    this.createForm();
    this.titleService.setTitle(`Leading Provider and Supplier of Tapware in Australia | Gentec Australia`)
  }

  createForm() {
    this.form = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      subject: [''],
      message: ['']
    })
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        console.log(fragment)
        const element = document.querySelector("#" + fragment);
      if (element) {
         element.scrollIntoView(true);
         this.router.navigate(['/']);
        }
      }
    });
  }

  checkAuth() {
    // console.log('wow',this.afAuth.authState)
    return this.afAuth.authState.pipe(
      take(1),
      map(user => !!user)
    );
  }

  ngOnInit() {

    this.checkAuth().subscribe((res) => {
      this.addToProject = res;
      this.isLoggin = res
    });

      setTimeout(() => {
        this.scriptsService.prepareJquery();
      }, 1000)
    this.productsService.getAllCategories(res => {
      // console.log(res);
      this.categories = res;
    });
    
    this.postService.getAllPostsByCategory('news').subscribe(res => {
      // console.log(res);
      this.posts= res;
     });
    this.postService.getAllPostsByCategory('about').subscribe(res => {
      // console.log(res);
      this.abouts= res;
     });
     this.vs.localstorage('banners').subscribe(res => {
      // console.log('banners: ',res);
      this.banners = res;
     });
    //  this.productsService.getAllBanners().subscribe(res => {
    //   console.log('banners: ',res);
    //   this.banners = res;
    //  });
    //  this.productsService.getAllSolutions().subscribe((data) => {
    //   this.solutions = data;
    // })
    //  this.productsService.getData().subscribe(res => {
    //   console.log('latest products: ',res);
    //   this.products2 = res;
    //  });
    this.getAllProducts();
    this.getAllSolutions();
  }

  getAllSolutions() {
    this.vs.localstorage('solutions').subscribe((solutions) => {
      this.solutions = solutions;
      // console.log(solutions)
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
    let ids = ['PLUS1000BM', 'SANH710BR'];
    _(ids).each((id) => {
      this.productsService.GetNewReleases(id).subscribe((res:any) => {
        this.products.push(res)
        console.log(this.products)
      })
    });
    // this.vs.localstorage('products').subscribe((products:any) => {
    //   if(products.length) {
    //     this.products = products;
    //   }
    // });
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
        this.form.value['type'] = 'inquiry';
        this.vs.SendEmail(this.form.value).subscribe((res:any) => {
          this.form.reset();
        })
      }
    })
  }

  search(value?) {
    if(value) {
      this.router.navigate(['/products'], { queryParams: { s: value.toLowerCase() } })
    } else {
      this.router.navigate(['/products'], { queryParams: { s: this.filterQuery } })
    }
  }

  addToProduct(product) {
    const activeModal = this.modalService.open(AddToProjectComponent, { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.product = product
    activeModal.result.then((result) => {
      this.vs.showAddProjectModal = result.value
    })
  }

}
