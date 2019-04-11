import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/products.service';
import { ScriptsService } from 'src/app/core/scripts.service';
import { PostService } from 'src/app/core/post.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';

@Component({
  selector: 'projcat',
  templateUrl: './projcat.component.html',
  styleUrls: ['./projcat.component.scss']
})
export class ProjcatComponent implements OnInit {
  
  posts: any = [];
  recents: any = [];

  constructor(
    public productServices: ProductsService,
    public scriptsService: ScriptsService,
    public postService: PostService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getAllPosts();
    this.getRecentNews();
    setTimeout(() => {
      this.scriptsService.prepareJquery();
    }, 1000)
  }


  getAllPosts() {
    this.postService.getAllPostsByCategory('projects').subscribe((res) => {
      console.log(res)
      this.posts = res;
    })
  }

  getRecentNews() {
    this.postService.getAllPostsByCategory('projects', 3).subscribe((res) => {
      console.log(res)
      this.recents = res;
    })
  }

}
