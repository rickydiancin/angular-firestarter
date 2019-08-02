import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductService } from 'src/app/core/products.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { VariablesService } from 'src/app/core/variables.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToProjectComponent } from '../product/add-to-project/add-to-project.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map } from 'rxjs/operators';
import { BannerService } from 'src/app/core/banner.service';
import { PostService } from 'src/app/core/post.service';
import { MenuService } from 'src/app/core/menu.service';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/core/token.service';
import { AuthService } from 'src/app/core/auth.service';

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
  sidebanner: any;
  releases: any;

  ImageURL = environment.ImageURL;
  post: any;
  loadPost: boolean;
  loadRelease: boolean;
  cookieExists: boolean;
  message: any = '';
  success: boolean = false;

  constructor(
    private scriptsService: ScriptsService,
    private productService: ProductService,
    private router: Router,
    public vs: VariablesService,
    public formBuilder: FormBuilder,
    // public postService: PostService,
    private titleService: Title,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private auth: AuthService,
    private bannerService: BannerService,
    private postService: PostService,
    private menuService: MenuService,
    private tokenService: TokenService
  ) {
    this.createForm();
    this.titleService.setTitle(`Leading Provider and Supplier of Tapware in Australia | Gentec Australia`);
    this.cookieExists = tokenService.checkToken();
    this.auth.listen().subscribe(() => {
      this.cookieExists = tokenService.checkToken();
    })
  }

  createForm() {
    this.form = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.querySelector("#" + fragment);
      if (element) {
         element.scrollIntoView(true);
         this.router.navigate(['/']);
        }
      }
    });
  }

  // checkAuth() {
  //   // console.log('wow',this.afAuth.authState)
  //   return this.afAuth.authState.pipe(
  //     take(1),
  //     map(user => !!user)
  //   );
  // }

  ngOnInit() {

    // this.checkAuth().subscribe((res) => {
    //   this.addToProject = res;
    //   this.isLoggin = res
    // });

      setTimeout(() => {
        this.scriptsService.prepareJquery();
      }, 1000)
    // this.productsService.getAllCategories(res => {
    //   // console.log(res);
    //   this.categories = res;
    // });
    
    // this.postService.getAllPostsByCategory('news').subscribe(res => {
    //   // console.log(res);
    //   this.posts= res;
    //  });

    // this.postService.getAllPostsByCategory('about').subscribe(res => {
    //   // console.log(res);
    //   this.abouts= res;
    //  });

     this.bannerService.GetAllBanner().subscribe((res: any) => {
      // console.log('banners: ',res);
      this.banners = res;
     });

    this.postService.GetSinglePost('5d3a53f413976a217c744cd5').subscribe(res => {
      this.sidebanner = res;
    });

    this.loadPost = false;
    this.loadRelease = false;
    this.postService.GetLatestPost().subscribe((res: any) => {
      this.post = res;
      this.loadPost = true;
      this.loadRelease = true;
    });

    this.productService.GetNewReleases().subscribe((res: any) => {
      this.releases = res;
    })
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
    this.GetNewReleases();
    this.getAllSolutions();
  }

  getAllSolutions() {
    this.menuService.GetSingleMenu('5d3981e331876d2aa4a48eef').subscribe((res: any) => {
      this.solutions = res;
    })
    // this.vs.localstorage('solutions').subscribe((solutions) => {
    //   this.solutions = solutions;
    //   // console.log(solutions)
    // });
    // if(this.vs.localstorage('solutions')) {
    //   this.solutions = JSON.parse(localStorage.getItem('solutions'));
    // } else {
    //   this.productsService.getAllSolutions().subscribe((data) => {
    //     this.solutions = data;
    //     localStorage.setItem('solutions', JSON.stringify(data));
    //   })
    // }
  }

  GetNewReleases() {
    // this.productsService.GetNewReleases().subscribe((releses:any) => {
    //   console.log(releses);
    //   this.releases = releses;
    // })
  }

  // getAllProducts() {
  //   let ids = ['PLUS1000BM', 'SANH710BR'];
  //   _(ids).each((id) => {
  //     this.productsService.GetNewReleases(id).subscribe((res:any) => {
  //       this.products.push(res)
  //       console.log(this.products)
  //     })
  //   });
  //   // this.vs.localstorage('products').subscribe((products:any) => {
  //   //   if(products.length) {
  //   //     this.products = products;
  //   //   }
  //   // });
  // }

  onSelect(event: TypeaheadMatch): void {
    console.log(event)
    this.router.navigate(['/product/' + event.item.productCode]);
  }

  NewInquires() {
    this.success = false;
    this.productService.NewInquires(this.form.value).subscribe((res: any) => {
      this.form.reset();
      this.message = res.message
      this.success = true
    })
    // this.form.value.isActive = true;
    // this.form.value.dateCreated = Date.now();
    // this.productsService.createInquires(this.form.value).then((success) => {
    //   if(success) {
    //     this.form.value['type'] = 'inquiry';
    //     this.vs.SendEmail(this.form.value).subscribe((res:any) => {
    //       this.form.reset();
    //     })
    //   }
    // })
  }

  search(value?) {
    if(value) {
      this.router.navigate(['/products'], { queryParams: { s: value.toLowerCase() } })
    } else {
      this.router.navigate(['/products'], { queryParams: { s: this.filterQuery } })
    }
  }

  // addToProduct(product) {
  //   const activeModal = this.modalService.open(AddToProjectComponent, { size: 'lg', backdrop: 'static' });
  //   activeModal.componentInstance.product = product
  //   activeModal.result.then((result) => {
  //     this.vs.showAddProjectModal = result.value
  //   })
  // }

  addToProduct(product) {
    if (this.cookieExists) {
      const activeModal = this.modalService.open(AddToProjectComponent, { size: 'lg', backdrop: 'static' });
      activeModal.componentInstance.product = product
      activeModal.result.then((result) => {
        this.vs.showAddProjectModal = result.value
      })
    } else {
      this.router.navigate(['/login'])
    }
  }

}
