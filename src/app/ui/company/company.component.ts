import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/post.service';

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  post:any;

  constructor(
    public postService: PostService,
  ) { }

  ngOnInit() {
    this.postService.getSinglePost('QuqOqE2JjhIDJLlnpitN').subscribe(res => {
      console.log(res);
      this.post= res;
     });
  }

}
