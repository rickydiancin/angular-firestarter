import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'newssingle',
  templateUrl: './newssingle.component.html',
  styleUrls: ['./newssingle.component.scss']
})
export class NewssingleComponent implements OnInit {

  singleNews:any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

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
