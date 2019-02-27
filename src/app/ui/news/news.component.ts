import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/products.service';
import { ScriptsService } from 'src/app/core/scripts.service';
import { PostService } from 'src/app/core/post.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs/operators';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

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
    this.postService.getAllPostsByCategory('news').subscribe((res) => {
      console.log(res)
      this.posts = res;
    })
  }

  getRecentNews() {
    this.postService.getAllPostsByCategory('news', 3).subscribe((res) => {
      console.log(res)
      this.recents = res;
    })
  }


}
