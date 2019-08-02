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
      _id: [''],
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

  deleteProject(project) {
    if(confirm("Do you want to delete?")) {
      this.projectService.Deleteproject(project._id).subscribe((res: any) => {
        console.log('Project successfully deleted');
        this.GetAllProjects();
      })
    }
  }

  editProject(data) {
    this.form.patchValue(data);
    this.isUpdate = true;
  }

  updateProject() {
    this.projectService.UpdateProject(this.form.value).subscribe((res: any) => {
      this.form.reset();
      this.isUpdate = false;
      this.GetAllProjects();
    })
  }

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
