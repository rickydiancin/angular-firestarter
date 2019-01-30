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
import { WishlistComponent } from './ui/wishlist/wishlist.component';
import { ProjectsComponent } from './ui/projects/projects.component';
import { ProjectProductsComponent } from './ui/projects/project-products/project-products.component';
import { SingleCategoryComponent } from './ui/category/single-category/single-category.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'products', component: CategoryComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:id', component: SingleCategoryComponent },
  { path: 'search', component: CategoryComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'account/projects/:id', component: ProjectProductsComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] },
  { path: 'uploads',  component: UploadPageComponent,  canActivate: [AuthGuard] },
  { path: 'ssr', component: SsrPageComponent },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
