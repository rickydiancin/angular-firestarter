import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/core/products.service';
import { ScriptsService } from 'src/app/core/scripts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from './add-project/add-project.component';
import { AuthService } from 'src/app/core/auth.service';
declare var $: any;

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  form: any;
  projects: any;
  isUpdate: Boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public productServices: ProductsService,
    public scriptsService: ScriptsService,
    private modalService: NgbModal,
    public authService: AuthService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
      location: ['', Validators.required],
      dateCreated: [''],
      isActive: [''],
      crearedBy: [this.authService.user.uid]
    })
  }

  ngOnInit() {
    console.log(this.authService.user)
    this.getAllProjectsByUser();
    setTimeout(() => {
      this.scriptsService.prepareJquery();
    }, 1000)
  }

  createProject() {
    this.form.controls['dateCreated'].setValue(Date.now())
    this.form.controls['isActive'].setValue(true)
    this.productServices.newProjects(this.form.value).then(() => {
      console.log('New Project successfully added');
      this.form.reset();
    })
  }

  deleteProject(id) {
    this.productServices.deleteProject(id).then(() => {
      console.log('Project successfully deleted');
    })
  }

  editProject(data) {
    this.form.patchValue(data);
    this.isUpdate = true;
  }

  updateProject() {
    this.productServices.newProjects(this.form.value).then(() => {
      console.log('Project successfully updated');
      this.form.reset();
      this.isUpdate = false;
    })
  }

  updateCancel() {
    this.form.reset();
    this.isUpdate = false;
  }

  getAllProjectsByUser() {
    if (this.authService.user) {
      this.productServices.getAllProjectsByUser(this.authService.user.uid).subscribe((projects) => {
        console.log(projects)
        this.projects = projects;
      })
    }
  }

  addProject() {
    // $('#b-promo_popup').modal('show');
    const activeModal = this.modalService.open(AddProjectComponent, { size: 'lg' });
  }

}
