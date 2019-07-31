import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/products.service';
import { ScriptsService } from 'src/app/core/scripts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from './add-project/add-project.component';
import { AuthService } from 'src/app/core/auth.service';
import { ProjectService } from 'src/app/core/project.service';
declare var $: any;

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  form: any;
  projects: any = [];
  isUpdate: Boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public productServices: ProductService,
    public scriptsService: ScriptsService,
    private modalService: NgbModal,
    public authService: AuthService,
    public projectService: ProjectService
  ) {
    this.createForm();
    this.projectService.listen().subscribe((res: any) => {
      this.projects.push(res);
    })
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
      location: ['', Validators.required]
    })
  }

  ngOnInit() {
    // console.log('the user:',this.authService.user)
    this.GetAllProjects();
    // setTimeout(() => {
    //   this.scriptsService.prepareJquery();
    // }, 1000)
  }

  createProject() {
    this.projectService.NewProject(this.form.value).subscribe((res: any) => {
      this.form.reset();
      this.projectService.listener(res.result);
    })
  }

  // deleteProject(id) {
  //   this.productServices.deleteProject(id).then(() => {
  //     console.log('Project successfully deleted');
  //   })
  // }

  // editProject(data) {
  //   this.form.patchValue(data);
  //   this.isUpdate = true;
  // }

  // updateProject() {
  //   this.productServices.newProjects(this.form.value).then(() => {
  //     console.log('Project successfully updated');
  //     this.form.reset();
  //     this.isUpdate = false;
  //   })
  // }

  updateCancel() {
    this.form.reset();
    this.isUpdate = false;
  }

  GetAllProjects() {
    this.projectService.GetAllProjects().subscribe((res: any) => {
      this.projects = res;
    })
  }

  addProject() {
    // $('#b-promo_popup').modal('show');
    const activeModal = this.modalService.open(AddProjectComponent, { size: 'lg' });
  }

}
