import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/post.service';
import { ScriptsService } from 'src/app/core/scripts.service';

@Component({
  selector: 'distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent implements OnInit {

  post:any;

  constructor(
    public postService: PostService,
    public scriptsService: ScriptsService, 
  ) { }

  ngOnInit() {

    setTimeout(() => {
      this.scriptsService.prepareJquery();
    }, 1000)

    this.postService.getSinglePost('sCgQFxJxCU9RpFQY9WcX').subscribe(res => {
      console.log(res);
      this.post= res;
     });
  }

}
