import { Component, OnInit, Input } from '@angular/core';
import { ScriptsService } from 'src/app/core/scripts.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/core/products.service';
import { VariablesService } from 'src/app/core/variables.service';
import { AuthService } from 'src/app/core/auth.service';

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

  constructor(
    public scriptsService: ScriptsService,
    public formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    public productServices: ProductsService,
    public vs: VariablesService,
    public authService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit() {
    setTimeout(() => {
      this.scriptsService.prepareJquery();
    }, 1000)

    console.log(this.authService.user);
  }

  createForm() {
    this.form = this.formBuilder.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      code: ['', Validators.required],
      location: ['', Validators.required],
      dateCreated: [''],
      isActive: []
    })
  }

  closeModal() {
    // $('#b-promo_popup').modal('hide');
    this.activeModal.close({value: false});
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
    this.activeModal.close();
  }

}
