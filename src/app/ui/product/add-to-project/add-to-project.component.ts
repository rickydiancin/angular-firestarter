import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from '../../projects/add-project/add-project.component';
import { FormBuilder, Validators } from '@angular/forms';
import { VariablesService } from 'src/app/core/variables.service';
import { ProductsService } from 'src/app/core/products.service';
import { AuthService } from 'src/app/core/auth.service';
import * as _ from 'lodash';
declare var $: any;

@Component({
  selector: 'add-to-project',
  templateUrl: './add-to-project.component.html',
  styleUrls: ['./add-to-project.component.scss']
})
export class AddToProjectComponent implements OnInit {

  data: any;
  form: any;
  isUpdate: Boolean = false;
  success: Boolean = false;
  message: any = '';
  product: any;
  projects: any;
  projectProducts: any;
  filter: any = '';

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public vs: VariablesService,
    private productService: ProductsService,
    private auth: AuthService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      projectName: ['0', Validators.required],
    })
  }

  ngOnInit() {
    this.getAllProjects();
    this.getAllProjectProducts();
    console.log(this.product)
  }

  closeModal() {
    this.activeModal.close({ value: false});
  }

  createNewProject() {
    this.vs.showAddProjectModal = true;
  }

  getAllProjects() {
    this.productService.getAllProjects().subscribe((projects) => {
      this.projects = projects
      // _(projects).each((valueA:any, keyA) => {
      let AllProjectProducts = this.productService.getAllProjectProducts().subscribe((products:any) => {
          if (products) {
            AllProjectProducts.unsubscribe();
            for (let x = 0; x < this.projects.length; x++) {
              for (let y = 0; y < products.length; y++) {
                if (this.projects[x].code == products[y].projects) {
                  this.projects[x].added = !this.projects[x].added;
                  this.projects[x].productID = products[y].id;
                }
              }
            }
          }
          // _(products).each((valueB:any, keyB) => {
          //   this.toggleProduct(valueB.projects);
            // if (valueA.code == valueB.projects) {
            //   this.projects[keyA].added = !this.projects[keyA].added;
            //   this.projects[keyA].productID = valueB.id;
            // }
          // })
        })
      // })
      console.log(this.projects)
    })
  }

  addProductToProject(project) {
    this.product.quantity = 0;
    this.product.projects = project.code;
    this.product.userID = this.auth.user.uid;
    this.productService.addProductToProject(this.product).then((success) => {
      project.productID = success.id;
      this.success = true;
      this.message = `'${this.product.productTitle}' was added to your project`;
      this.toggleProduct(project, 'add');
    })
  }

  getAllProjectProducts() {
    // this.productService.getAllProjects().subscribe((projects) => {
    //   this.projects = 
    // })
    // this.productService.getAllProjectProducts().subscribe((projectProducts) => {
    //   this.projectProducts = projectProducts;
    //   _(projectProducts).each((value:any, key) => {
    //     this.productService.getProjects(value.projects).subscribe((project:any) => {
    //       this.projectProducts[key].projectName = project.projectName;
    //     })
    //   })
    //   console.log(this.projectProducts)
    // })
  }

  removeToProject(product) {
    this.productService.deleteToProject(product.productID).then(() => {
      this.success = true;
      this.message = `'${this.product.productTitle}' was removed from your '${product.projectName}' project`;
      // this.getAllProjects();
      this.toggleProduct(product, 'remove');
    })
  }

  toggleProduct(product, action) {
    for (let x = 0; x < this.projects.length; x++) {
      if (this.projects[x].code == product.code) {
        if(action == 'remove') {
          this.projects[x].added = !this.projects[x].added;
        } else {
          this.projects[x].added = !this.projects[x].added;
          this.projects[x].productID = product.productID;
        }
      }
    }
  }

}
