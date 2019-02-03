import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserLoginComponent } from './user-login/user-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SsrPageComponent } from './ssr-page/ssr-page.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { CompanyComponent } from './company/company.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncateModule } from 'ng2-truncate';
import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { AddToProjectComponent } from './product/add-to-project/add-to-project.component';
import {NgbModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { NgPipesModule } from 'ngx-pipes';
import { ProjectProductsComponent } from './projects/project-products/project-products.component';
import { Angular2CsvModule } from 'angular2-csv';
import { SingleCategoryComponent } from './category/single-category/single-category.component';
import { NewsComponent } from './news/news.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgxPaginationModule, TruncateModule, FormsModule, NgPipesModule, NgbModule, Angular2CsvModule, TypeaheadModule.forRoot()],
  declarations: [
    UserLoginComponent,
    HomePageComponent,
    MainNavComponent,
    LoadingSpinnerComponent,
    NotificationMessageComponent,
    UserProfileComponent,
    UserFormComponent,
    SsrPageComponent,
    CategoryComponent,
    ProductComponent,
    CompanyComponent,
    WishlistComponent,
    ProjectsComponent,
    AddProjectComponent,
    AddToProjectComponent,
    ProjectProductsComponent,
    SingleCategoryComponent,
    NewsComponent,
    InvoiceComponent
  ],
  entryComponents:[
    AddProjectComponent,
    AddToProjectComponent
  ],
  exports: [
    MainNavComponent,
    LoadingSpinnerComponent,
    NotificationMessageComponent,
    UserProfileComponent,
    UserFormComponent,
    // AddProjectComponent
  ]
})
export class UiModule {}
