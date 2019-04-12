import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/products.service';
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

  constructor(
    public productServices: ProductsService,
    public scriptsService: ScriptsService,
    public postService: PostService,
    private spinner: NgxSpinnerService,
    public route: ActivatedRoute
  ) {
    this.params = route.snapshot.params.cat;
  }

  ngOnInit() {
    this.getAllPosts();
    this.getRecentNews();
    setTimeout(() => {
      this.scriptsService.prepareJquery();
    }, 1000)
  }

  getAllPosts() {
    this.route.params.subscribe((params) => {
      if(params) {
        this.postService.getAllPostsByCategory(params.cat).subscribe((res) => {
          this.posts = res;
        })
      }
    })
  }

  getRecentNews() {
    this.postService.getAllPostsByCategory('news', 3).subscribe((res) => {
      this.recents = res;
    })
  }


}
