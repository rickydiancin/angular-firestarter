import { Component, OnInit } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { ProductsService } from 'src/app/core/products.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToProjectComponent } from './add-to-project/add-to-project.component';
import { VariablesService } from 'src/app/core/variables.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Observable<any[]>;
  content: string;
  pid: string;
  theproduct: any;
  constructor(
    private scriptsService: ScriptsService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public vs: VariablesService
  ) { }

  ngOnInit() {
    this.pid = this.route.snapshot.params.id;
    this.products = this.productsService.getData();
    console.log(this.products);
    setTimeout(() => {
      this.scriptsService.prepareJquery();
       },1000)
       this.productsService.getProduct(this.pid.split('.')[1]).valueChanges()
       .subscribe(res => {
        console.log(res);
        this.theproduct = res;
      });
  }

  addToProduct(product) {
    // $('#b-promo_popup').modal('show');
    const activeModal = this.modalService.open(AddToProjectComponent, { size: 'lg', backdrop: 'static' });
    activeModal.componentInstance.product = product
    activeModal.result.then((result) => {
      this.vs.showAddProjectModal = result.value
    })
  }

}
