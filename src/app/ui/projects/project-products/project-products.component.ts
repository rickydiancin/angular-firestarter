import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'project-products',
  templateUrl: './project-products.component.html',
  styleUrls: ['./project-products.component.scss']
})
export class ProjectProductsComponent implements OnInit {

  id: any;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id)
  }

}
