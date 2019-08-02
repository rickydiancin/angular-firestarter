import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/post.service';

@Component({
  selector: 'warranty',
  templateUrl: './warranty.component.html',
  styleUrls: ['./warranty.component.scss']
})
export class WarrantyComponent implements OnInit {
  post:any;

  constructor(
    public postService: PostService,
  ) { }

  ngOnInit() {
    // this.postService.GetSinglePost().subscribe(() => {
      
    // })
    // this.postService.getSinglePost('xxWtGg1hZR1XwFvoeUgG').subscribe(res => {
    //   console.log(res);
    //   this.post= res;
    //  });
  }

}
