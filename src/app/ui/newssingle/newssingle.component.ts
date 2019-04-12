import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/post.service';
import { ActivatedRoute } from '@angular/router';

import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { faPinterest } from '@fortawesome/free-brands-svg-icons/faPinterest';

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
  
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
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
    this.postService.getSinglePost(id).subscribe((res) => {
      this.singleNews = res;
      console.log(res)
    })
  }

}
