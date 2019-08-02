import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/products.service';
import { ScriptsService } from 'src/app/core/scripts.service';
import { PostService } from 'src/app/core/post.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  posts: any = [];
  recents: any = [];
  params: any;
  postsLoaded: boolean = false;

  constructor(
    public productServices: ProductService,
    public scriptsService: ScriptsService,
    public postService: PostService,
    private spinner: NgxSpinnerService,
    public route: ActivatedRoute
  ) {
    this.params = route.snapshot.params.cat;
  }
  ngOnInit() {
    this.getAllPosts();
    // this.getRecentNews();
    setTimeout(() => {
      this.scriptsService.prepareJquery();
    }, 1000)
  }

  getAllPosts() {
    this.route.params.subscribe((params) => {
      if(params.cat) {
        this.postsLoaded = false;
        this.postService.GetAllPostCategoryByID(params.cat).subscribe((res) => {
          console.log('posts: ', this.posts);
          this.posts = res;
          this.postsLoaded = true;
        });
        // this.postService.GetAllPostCategory(params.cat, 5).subscribe((res) => {
        //   this.recents = res;
        // })
      }
    })
  }

  getRecentNews() {
    this.postService.getAllPostsByCategory(this.params, 5).subscribe((res) => {
      this.recents = res;
    })
  }


}
