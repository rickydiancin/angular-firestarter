import { Component, OnInit, Input } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/core/products.service';
import { VariablesService } from 'src/app/core/variables.service';
import { AuthService } from 'src/app/core/auth.service';
import { ProjectService } from 'src/app/core/project.service';

declare var $: any;

@Component({
  selector: 'add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  form: any;
  isUpdate = false;
  @Input() hideForm: Boolean;
  success: boolean;
  message: string;

  constructor(
    public scriptsService: ScriptsService,
    public formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    public productServices: ProductService,
    public vs: VariablesService,
    public authService: AuthService,
    public projectService: ProjectService
  ) {
    this.createForm();
  }

  ngOnInit() {
    // console.log(this.authService.user)
    // setTimeout(() => {
    //   this.scriptsService.prepareJquery();
    // }, 1000)

    // console.log(this.authService.user);
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
      location: ['', Validators.required]
    })
  }

  closeModal() {
    // $('#b-promo_popup').modal('hide');
    this.activeModal.close({value: false});
  }

  createProject() {
    this.projectService.NewProject(this.form.value).subscribe((res: any) => {
      this.form.reset();
      this.success = true;
      this.message = `'${res.message}`;
      this.projectService.listener(res.result);
    })
    // this.form.controls['dateCreated'].setValue(Date.now())
    // this.form.controls['isActive'].setValue(true)
    // this.productServices.newProjects(this.form.value).then(() => {
    //   console.log('New Project successfully added');
    //   this.form.reset();
    // })
  }

  deleteProject(id) {
    // this.productServices.deleteProject(id).then(() => {
    //   console.log('Project successfully deleted');
    // })
  }

  editProject(data) {
    this.form.patchValue(data);
    this.isUpdate = true;
  }

  updateProject() {
    // this.productServices.newProjects(this.form.value).then(() => {
    //   console.log('Project successfully updated');
    //   this.form.reset();
    //   this.isUpdate = false;
    // })
  }

  updateCancel() {
    this.activeModal.close();
  }

}
