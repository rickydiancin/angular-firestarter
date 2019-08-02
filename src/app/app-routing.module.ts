import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { UploadPageComponent } from './uploads/upload-page/upload-page.component';

import { SsrPageComponent } from './ui/ssr-page/ssr-page.component';
import { CategoryComponent } from './ui/category/category.component';
import { ProductComponent } from './ui/product/product.component';
import { CompanyComponent } from './ui/company/company.component';
// import { WishlistComponent } from './ui/wishlist/wishlist.component';
import { ProjectsComponent } from './ui/projects/projects.component';
import { ProjectProductsComponent } from './ui/projects/project-products/project-products.component';
import { SingleCategoryComponent } from './ui/category/single-category/single-category.component';
import { NewsComponent } from './ui/news/news.component';
import { InvoiceComponent } from './ui/invoice/invoice.component';
import { NewssingleComponent } from './ui/newssingle/newssingle.component';
import { WarrantyComponent } from './ui/warranty/warranty.component';
import { DistributionComponent } from './ui/distribution/distribution.component';
import { UserProfileComponent } from './ui/user-profile/user-profile.component';
import { PageContentComponent } from './ui/page-content/page-content.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'products', component: CategoryComponent },
  { path: 'products/search', component: CategoryComponent },
  { path: 'postcategory/:cat', component: NewsComponent },
  { path: 'postcategory/:cat/:id', component: NewssingleComponent },
  // { path: 'category/all', component: CategoryComponent },
  { path: 'category/:id', component: CategoryComponent },
  // { path: ':solutionsName', component: CategoryComponent },
  { path: 'solution/:solutionid', component: CategoryComponent },
  { path: 'search', component: CategoryComponent },
  // { path: 'wishlist', component: WishlistComponent },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'project/:id', component: ProjectProductsComponent },
  { path: 'projects/:id/invoice', component: InvoiceComponent },
  { path: 'about_us', component: CompanyComponent },
  { path: 'warranty', component: WarrantyComponent },
  { path: 'distribution', component: DistributionComponent },
  { path: 'page/:id', component: PageContentComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] },
  { path: 'uploads',  component: UploadPageComponent,  canActivate: [AuthGuard] },
  { path: 'ssr', component: SsrPageComponent },
  // { path: '**', component: HomePageComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
