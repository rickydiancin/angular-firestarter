import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  @ViewChild('content') content: ElementRef

  constructor() { }

  ngOnInit() {
  }

  public generatePDF() {
    let doc = new jsPDF();

    
    let specialElementHandlers = {
      '#editor': (element, renderer) => {
        return true;
      }
    }

    let content = this.content.nativeElement;
    // let content = document.getElementById('content');

    doc.fromHTML(content.innerHTML, 0, 0, {
      'width': 10,
      'elementHandlers': specialElementHandlers
    }, (bla) => { doc.save('test.pdf'); });
  } 

}
