import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/post.service';

@Component({
  selector: 'distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent implements OnInit {

  post:any;

  constructor(
    public postService: PostService,
  ) { }

  ngOnInit() {
    this.postService.getSinglePost('sCgQFxJxCU9RpFQY9WcX').subscribe(res => {
      console.log(res);
      this.post= res;
     });
  }

}
