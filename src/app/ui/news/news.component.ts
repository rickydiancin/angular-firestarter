import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/products.service';
import { ScriptsService } from 'src/app/core/scripts.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  posts: any;
  constructor(
    public productServices: ProductsService,
    public scriptsService: ScriptsService,
  ) { }

  ngOnInit() {
    this.getAllPosts();
    setTimeout(() => {
      this.scriptsService.prepareJquery();
    }, 1000)
  }

  getAllPosts() {
    this.productServices.getAllPosts().subscribe((res) => {
      console.log(res)
      this.posts = res;
    })
  }


}
