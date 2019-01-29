import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/products.service';

declare var $: any;

@Component({
  selector: 'project-products',
  templateUrl: './project-products.component.html',
  styleUrls: ['./project-products.component.scss']
})
export class ProjectProductsComponent implements OnInit {

  id: any;
  productProject: any;
  success: Boolean;

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
      'secondaryImageURLS',
      'technicalSheetURL',
      'DWGFileURL',
      'revitFileURL',
      'imageURL',
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
      'secondaryImageURLS',
      'technicalSheetURL',
      'DWGFileURL',
      'revitFileURL',
      'imageURL'
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
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
    this.productsService.deleteToProject(product.id).then(() => {
      this.success = true;
    })
  }

  downloadFile() {
    $('#exportFile').click();
  }

}
