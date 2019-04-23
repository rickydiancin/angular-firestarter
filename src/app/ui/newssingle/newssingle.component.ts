import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/post.service';
import { ActivatedRoute } from '@angular/router';

import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { faPinterest } from '@fortawesome/free-brands-svg-icons/faPinterest';
import { Meta } from '@angular/platform-browser';
import { SeoService } from 'src/app/core/seo.service';

@Component({
  selector: 'newssingle',
  templateUrl: './newssingle.component.html',
  styleUrls: ['./newssingle.component.scss']
})
export class NewssingleComponent implements OnInit {

  singleNews:any;
  params: any;

  fbIcon = faFacebookSquare;
  pinIcon = faPinterest;
  tweetIcon = faTwitterSquare;

  postsLoaded: boolean = false;
  
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private meta: Meta,
    private seo: SeoService
  ) {
    this.params = {
      category: route.snapshot.params.cat,
      id: route.snapshot.params.id
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getSinglePost(params.id);
    })
  }

  getSinglePost(id) {
    this.postsLoaded = false;
    this.postService.getSinglePost(id).subscribe((res:any) => {
      this.singleNews = res;
      this.postsLoaded = true;
      this.seo.generateTags({
        title: res.seoTitle || res.title,
        description: res.seoDescription || res.content,
        image: res.imgURL,
        slug: res.category
      });
    })
  }

}
