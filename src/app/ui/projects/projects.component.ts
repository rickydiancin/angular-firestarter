import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from 'src/app/core/products.service';

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
    public productServices: ProductsService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      projectName: [''],
      description: [''],
      code: [''],
      location: [''],
      dateCreated: [Date.now()],
      isActive: [true]
    })
  }

  ngOnInit() {
    this.getAllProjects();
  }

  createProject() {
    console.log(this.form.value);
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

  getAllProjects() {
    this.productServices.getAllProjects().subscribe((projects) => {
      console.log(projects)
      this.projects = projects;
    })
  }

}
