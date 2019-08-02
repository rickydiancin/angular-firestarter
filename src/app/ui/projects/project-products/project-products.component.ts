import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/products.service';
import * as html2canvas from 'html2canvas';
import { VariablesService } from 'src/app/core/variables.service';
import { ProjectService } from 'src/app/core/project.service';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';
import * as _ from 'lodash';

declare var $: any;
declare let jsPDF;
// declare let html2canvas;

@Component({
  selector: 'project-products',
  templateUrl: './project-products.component.html',
  styleUrls: ['./project-products.component.scss']
})
export class ProjectProductsComponent implements OnInit {

  id: any;
  productProject: any;
  success: Boolean;
  message: any;
  project: any;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductService,
    private vs : VariablesService,
    private projectService : ProjectService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    // this.getAllProjects();
    this.GetSingleProject();
  }

  GetSingleProject() {
    this.projectService.GetSingleProject(this.route.snapshot.params.id).subscribe((res: any) => {
      this.project = res[0];
    })
  }

  removeToProject(product) {
    // if (confirm(`Are you sure you want to delete '${product.productTitle}'?`)) {
    // this.productsService.deleteToProject(product.id).then(() => {
    //   this.success = true;
    //   this.message = `'${product.productTitle}' was removed from your '${this.id.split('.')[0]}' project`;
    // })
    // }
  }

  // downloadPDF() {
  //   let doc = new jsPDF('p', 'pt');
  //   let headerImgData = '';

  //   // let specialElementHandlers = {
  //   //   '#editor': function (element, renderer) {
  //   //     return true;
  //   //   }
  //   // };

  //   // var res = doc.autoTableHtmlToJson(document.getElementById("cart"));
  //   // doc.autoTable(res.columns, res.data, { margin: { top: 80 } });
  //   var width = 250;
  //   var height = 100;

  //   var header = function (data) {
  //     console.log(data);
  //     doc.setFontSize(18);
  //     doc.setTextColor(40);
  //     doc.setFontStyle('normal');
  //     doc.addImage(headerImgData, 'JPEG', 160, 20, width, height);
  //     // doc.text("GENTEC", data.settings.margin.left, 50);
  //   };
  //   var options = {
  //     didDrawPage: header,
  //     margin: {
  //       top: 80
  //     },
  //     // startY: doc.previousAutoTable.finalY + 20
  //   };
  //   // var res = doc.autoTableHtmlToJson(document.getElementById("cart"));
  //   doc.autoTable(options);
  //   doc.addPage();
  //   doc.autoTable({ html: document.getElementById("content") });

  //   doc.save(`${this.id.split('.')[0]}.pdf`);
  //   // let content = this.content.nativeElement;

  //   // doc.autoTable({ html: content.innerHTML })
  //   // let content = $('#content')[0];

  //   // doc.autoTable(content.innerHTML, margins.left, margins.top, {
  //   //   'width': margins.width,
  //   //   'elementHandlers': specialElementHandlers
  //   // });
  //   // doc.save('test.pdf');
  // }

  // downloadFile() {
  //   $('#exportFile').click();
  // }

  download() {
    let headerImgData = this.vs.pdfHeader();
    var canvas = <HTMLCanvasElement>document.querySelector("#content");
    let date = new Date();
    html2canvas(canvas, { useCORS: true, logging: false }).then(canvas => {
      var doc = new jsPDF('p', 'mm');

      doc.addImage(headerImgData, 'JPEG', 5, 5, 200, 140);

      doc.setFontSize(9);

      doc.setFontType('bold')
      doc.text(5, 200, 'Project Code: ');
      doc.setFontType('normal')
      doc.text(28, 200, this.project.code);

      doc.setFontType('bold')
      doc.text(5, 210, 'Project Name: ');
      doc.setFontType('normal')
      doc.text(5, 215, this.project.name);

      doc.setFontType('normal');
      // doc.setTextColor(150)
      doc.text(145, 200, 'For any further information regarding your');
      doc.text(150, 205, 'project specification please contact us');
      doc.text(178, 210, '(+612) 9319 4422');
      doc.text(171, 215, 'gentecaustralia.com.au');
      doc.text(184, 225, 'Date of Quote');
      doc.text(188, 230, (`${('0' + date.getDate().toString()).slice(-2)}/${('0' + (date.getMonth() + 1).toString()).slice(-2)}/${date.getFullYear()}`));

      doc.addPage();

      var imgData = canvas.toDataURL('image/png');
      var ratio = canvas.height / canvas.width;
      var width = 200;
      var height = ratio * doc.internal.pageSize.getWidth();


      doc.addImage(imgData, 'PNG', 5, 5, width, height);
      doc.setProperties({
        title: `${this.project.name}`
      });
      doc.save(`${this.project.name}.pdf`);
    });
  }

  downloadFile() {
    let options = {
      header: true,
      skipEmptyLines: 'true'
    }
    const _products = [];
    for(var p in this.project.products) {
      _products.push(_.omit(this.project.products[p], ['_id', 'createdBy',	'dateCreated',	'__v', 'isValid'] ));
    }
    var csv = Papa.unparse(_products, options);
    let blob = new Blob(["\ufeff", csv], { type: 'text/csv' });
    saveAs(blob, "project_products.csv");
  }

}
