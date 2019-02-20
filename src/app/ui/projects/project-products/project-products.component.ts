import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/products.service';
import * as html2canvas from 'html2canvas';
import * as rasterizeHTML from 'rasterizeHTML';
import { VariablesService } from 'src/app/core/variables.service';

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

  options = {
    fieldSeparator: ',',
    quoteStrings: '',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    title: 'asfasf',
    useBom: false,
    removeNewLines: true,
    headers: [
      'productCode',
      'productTitle',
      'productDescription',
      'productPrice',
      'categories',
      'parentProduct',
      'dateCreated',
      'createdBy',
      'description',
      'width',
      'height',
      'depth',
      'leverLength',
      'weightBearing',
      'wasteLocation',
      'plugAndWaste',
      'overflow',
      'seatColour',
      'sTrap',
      'pTrap',
      'flushPlate',
      'welsRating',
      'litresPerMinute',
      'materials',
      'lockable',
      'cartridge',
      'cartridgeSize',
      'runTime',
      'inletValve',
      'outletValve',
      'outlet',
      'MixedTemp',
      'inletTemperatureHot',
      'inletTemperatureCold',
      'maxInletPressure',
      'workingPressures',
      'maxWorkingTemp',
      'seat',
      'colourFinish',
      'servicing',
      'solutions',
      'warranty',
      'feautures',
      'flowRate',
      'fireResistanceLevel',
      'patentNumber',
      // 'secondaryImageURLS',
      'technicalSheetURL',
      'DWGFileURL',
      'revitFileURL',
      // 'imageURL',
    ],
    keys: [
      'productCode',
      'productTitle',
      'productDescription',
      'productPrice',
      'categoriesCode',
      'parentProduct',
      'dateCreated',
      'createdBy',
      'description',
      'width',
      'height',
      'depth',
      'leverLength',
      'weightBearing',
      'wasteLocation',
      'plugAndWaste',
      'overflow',
      'seatColour',
      'sTrap',
      'pTrap',
      'flushPlate',
      'welsRating',
      'litresPerMinute',
      'materials',
      'lockable',
      'cartridge',
      'cartridgeSize',
      'runTime',
      'inletValve',
      'outletValve',
      'outlet',
      'MixedTemp',
      'inletTemperatureHot',
      'inletTemperatureCold',
      'maxInletPressure',
      'workingPressures',
      'maxWorkingTemp',
      'seat',
      'colourFinish',
      'servicing',
      'solutionsCode',
      'warranty',
      'feautures',
      'flowRate',
      'fireResistanceLevel',
      'patentNumber',
      // 'secondaryImageURLS',
      'technicalSheetURL',
      'DWGFileURL',
      'revitFileURL',
      // 'imageURL'
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private vs : VariablesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id)
    this.getAllProjects();
  }

  getAllProjects() {
    this.productsService.getSelectedProjectProducts(this.id.split('.')[1]).subscribe((productProject) => {
      this.productProject = productProject;
      console.log(this.productProject)
    });
  }

  removeToProject(product) {
    if (confirm(`Are you sure you want to delete '${product.productTitle}'?`)) {
    this.productsService.deleteToProject(product.id).then(() => {
      this.success = true;
      this.message = `'${product.productTitle}' was removed from your '${this.id.split('.')[0]}' project`;
    })
    }
  }

  downloadFile() {
    $('#exportFile').click();
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
    html2canvas(canvas, { useCORS: true, logger: false }).then(canvas => {
      var doc = new jsPDF('p');
      var imgData = canvas.toDataURL('image/png');
      var width = 200;
      var height = 35;

      doc.addImage(headerImgData, 'JPEG', 5, 5, 200, 160);

      doc.setFontSize(9);

      doc.setFontType('bold')
      doc.text(5, 200, 'Project Code: ');
      doc.setFontType('normal')
      doc.text(28, 200, this.id.split('.')[1]);

      doc.setFontType('bold')
      doc.text(5, 210, 'Project Name: ');
      doc.setFontType('normal')
      doc.text(5, 215, this.id.split('.')[0]);

      doc.setFontType('normal');
      // doc.setTextColor(150)
      doc.text(145, 200, 'For any further information regarding your');
      doc.text(150, 205, 'project specification please contact us');
      doc.text(178, 210, '(+612) 9319 4422');
      doc.text(171, 215, 'gentecaustralia.com.au');
      doc.text(184, 225, 'Date of Quote');
      doc.text(188, 230, (`${('0' + date.getDate().toString()).slice(-2)}/${('0' + (date.getMonth() + 1).toString()).slice(-2)}/${date.getFullYear()}`));

      doc.addPage();

      doc.addImage(imgData, 'PNG', 5, 5, width, height);
      doc.setProperties({
        title: `${this.id.split('.')[0]}`
      });
      doc.save(`${this.id.split('.')[0]}.pdf`);
    });
  }

}
