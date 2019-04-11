import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToProjectComponent } from './add-to-project/add-to-project.component';
import { VariablesService } from 'src/app/core/variables.service';
import * as jsPDF from 'jspdf';
import * as _ from 'lodash';
import { take, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {

  @ViewChild('content') content: ElementRef

  products = [];
  // content: string;
  pid: string;
  theproduct: any;
  productExport: any = [];
  catName: any;
  relateds: any;
  addToProject: boolean = true;
  nextProduct:any;
  prevProduct:any;
  isLoggin:Boolean;
  private fragment: string;
  productLoaded: Boolean = false;

  options = {
    fieldSeparator: ',',
    quoteStrings: '',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    title: 'asfasf',
    useBom: false,
    removeNewLines: true,
    headers: [
      'productCode',
      'productTitle',
      'productDescription',
      'productPrice',
      'categories',
      'parentProduct',
      'dateCreated',
      'createdBy',
      'description',
      'width',
      'height',
      'depth',
      'leverLength',
      'weightBearing',
      'wasteLocation',
      'plugAndWaste',
      'overflow',
      'seatColour',
      'sTrap',
      'pTrap',
      'flushPlate',
      'welsRating',
      'litresPerMinute',
      'materials',
      'lockable',
      'cartridge',
      'cartridgeSize',
      'runTime',
      'inletValve',
      'outletValve',
      'outlet',
      'MixedTemp',
      'inletTemperatureHot',
      'inletTemperatureCold',
      'maxInletPressure',
      'workingPressures',
      'maxWorkingTemp',
      'seat',
      'colourFinish',
      'servicing',
      'solutions',
      'warranty',
      'feautures',
      'flowRate',
      'fireResistanceLevel',
      'patentNumber',
      'secondaryImageURLS',
      'technicalSheetURL',
      'DWGFileURL',
      'revitFileURL',
      'imageURL',
    ],
    keys: [
      'productCode',
      'productTitle',
      'productDescription',
      'productPrice',
      'categoriesCode',
      'parentProduct',
      'dateCreated',
      'createdBy',
      'description',
      'width',
      'height',
      'depth',
      'leverLength',
      'weightBearing',
      'wasteLocation',
      'plugAndWaste',
      'overflow',
      'seatColour',
      'sTrap',
      'pTrap',
      'flushPlate',
      'welsRating',
      'litresPerMinute',
      'materials',
      'lockable',
      'cartridge',
      'cartridgeSize',
      'runTime',
      'inletValve',
      'outletValve',
      'outlet',
      'MixedTemp',
      'inletTemperatureHot',
      'inletTemperatureCold',
      'maxInletPressure',
      'workingPressures',
      'maxWorkingTemp',
      'seat',
      'colourFinish',
      'servicing',
      'solutionsCode',
      'warranty',
      'feautures',
      'flowRate',
      'fireResistanceLevel',
      'patentNumber',
      'secondaryImageURLS',
      'technicalSheetURL',
      'DWGFileURL',
      'revitFileURL',
      'imageURL'
    ]
  };
  slick: any = 0;

  constructor(
    private scriptsService: ScriptsService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public vs: VariablesService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private spinner: NgxSpinnerService,
    public sanitizer: DomSanitizer
  ) {
  }

  makeTrustedImage(item) {
    return this.sanitizer.bypassSecurityTrustUrl(item);
  }

  enlarge() {
    // if ($('.gallery').length > 0) {
    //   $(this).find('a').click();
    // }
    $('.gallery').each(function (index) {
      $(this).find('.active a').click();
    });
  }

  featureLink(link) {
    if (link) {
      const element = document.querySelector("#" + link);
      if (element) { element.scrollIntoView(true); }
    }
  }

  // getFile() {
  //   this.productsService.getFile().subscribe((data) => {
  //     console.log(data, 'files')
  //   })
  // }

  checkAuth() {
    // console.log('wow',this.afAuth.authState)
    return this.afAuth.authState.pipe(
      take(1),
      map(user => !!user)
    );
  }

  ngAfterViewInit() {
  }

  ngOnInit() {

    

    this.checkAuth().subscribe((res) => {
      this.addToProject = res;
      this.isLoggin = res
    });
    this.pid = this.route.snapshot.params.id;
    this.route.params.subscribe((params) => {
      this.productLoaded = false;
      // if(params) {
        // setTimeout(() => {
        //   this.scriptsService.prepareJquery();
        // }, 1000);
      // }
      this.productsService.getProduct(params.id).valueChanges()
        .subscribe(async res => {
          this.productsService.getAllProducts(res.parentProduct).subscribe((color:any) => {
            if(color.length) {
              res.variants = color;
            }
          })
          console.log(res)
          let c = [];
          res.categories = res.categories.split(';');
            res.categories.forEach(async (categoryID) => {
              await this.productsService.getCategoryByArray(categoryID).subscribe((category:any) => {
                if(category) {
                  c.push({ code: category.categoryCode, name: category.categoryName.toLowerCase() });
                  if (c) res.categoryName = c;
                } else {
                  res.categoryName = [];
                }
              })
            })
          res.features = res.features.trim().split('•');
          // res.features.shift();
          this.theproduct = await res;
          setTimeout(() => {
            $(document).ready(() => {
              this.slick = $('.slick-count > .owl-thumb-item').length;
            })
          }, 1000);
          this.productLoaded = true;
          // $(document).ready(function ($) {
          //   $('[data-toggle="tooltip"]').tooltip();
          //   console.log($(".gallery").length)
          //   if ($(".gallery").length > 0) {
          //     console.log($(".gallery").length > 0)
          //   }
          // })

          // if(res) {
            setTimeout(() => {
              this.scriptsService.prepareJquery();
            }, 1000);
          // }

            await this.vs.localstorage('products').subscribe((products: any) => {
            // var lookup = _.keyBy(res.categories, (o) => {
            //   return o.toString()
            // });
            //   var relateds = _.filter(products, function (u: any) {
            //   return lookup[u.categories.toString()] !== undefined;
            // });
              let relateds = [];
            res.categories.forEach(element => {
              let result = _.filter(products, row => row.categories.split(';').indexOf(element) > -1);
              result.forEach((el) => {
                relateds.push(el)
              })
            });
              this.relateds = relateds;
              

            // this.relateds = relateds;
              // console.log(lookup, relateds)

              let index = products.findIndex(x => x.productCode == params.id);
              this.nextProduct = products[index + 1];
              this.prevProduct = products[index - 1];

            this.productExport = [];
            this.productExport.push(res);
          })
        });
    });
  }

  addToProduct(product) {
    const activeModal = this.modalService.open(AddToProjectComponent, { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.product = product
    activeModal.result.then((result) => {
      this.vs.showAddProjectModal = result.value
    })
  }

  downloadFile() {

    $('#exportFile').click();
  }

  downloadPDF() {
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15,15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('test.pdf');

  }

  viewTechnicalDetails(link) {
    window.open(link, '_blank');
  }

  dwgFile(link) {
    window.open(link, '_blank');
  }

  revitFile(link) {
    window.open(link, '_blank');
  }

}
