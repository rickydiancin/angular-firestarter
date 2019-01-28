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
  product: any;
  projects: any;
  projectProducts: any;

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
      projectName: ['', Validators.required],
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
    })
  }

  addProductToProject() {
    this.product.quantity = 0;
    this.product.projects = this.form.get('projectName').value;
    this.product.userID = this.auth.user.uid;
    this.productService.addProductToProject(this.product).then(() => {
      this.success = true;
    })
  }

  getAllProjectProducts() {
    this.productService.getAllProjectProducts().subscribe((projectProducts) => {
      this.projectProducts = projectProducts;
      _(projectProducts).each((value:any, key) => {
        this.productService.getProjects(value.projects).subscribe((project:any) => {
          console.log(project)
          this.projectProducts[key].projectName = project.projectName;
        })
      })
      // console.log(projectProducts)
      // this.productService.getProjects(projectProducts.projects).subscribe(() => {

      // })
    })
  }

}
