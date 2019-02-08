import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  showAddProjectModal = false;
  categories: any;
  products: any;

  constructor(
    private productServices: ProductsService
  ) {}

  localstorage(collection) {
    switch (collection) {
      case 'products':
        if (typeof localStorage.getItem('products') === 'string') {
          return true;
        } else {
          return false;
        }
        break;
      case 'solutions':
        if (typeof localStorage.getItem('solutions') === 'string') {
          return true;
        } else {
          return false;
        }
        break;
      case 'banners':
        if (typeof localStorage.getItem('banners') === 'string') {
          return true;
        } else {
          return false;
        }
        break;
      case 'posts':
        if (typeof localStorage.getItem('posts') === 'string') {
          return true;
        } else {
          return false;
        }
        break;
    
      default:
        break;
    }
  }

  allMenus3(){
    let menus3 = [
      {
        title: 'Rails & Accessible Equipment',
        url: 'category/RAE',
        isparent: true
      },
      {
        title: 'Anti Microbial',
        url: 'category/AM',
       
      },
      {
       
        title: 'Stainless Steel',
        url: 'category/SS',
      },
      {
        title: 'Bathroom Accessories',
        url: 'category/BA',
        isparent: true
      },
      {
        title: 'Grate Seal',
        url: 'category/GRTS',
        isparent: true
      }
      
    ]

    
    return menus3;
  }


  allMenus2(){
    let menus2 = [
      {
        title: 'Showers',
        url: 'category/SHOWR',
        issub: true
      },
      {
        title: 'Safety Showers & Equipment',
        url: 'category/SSHOWE',
        issub: true
      },
      {
       
        title: 'Safety Showers',
        url: 'category/SSHOW',
      },
      {
      
        title: 'Emergency Eye/Face Wash',
        // title: 'Eyewash Combination',
        url: 'category/EEFW',
      },
      {
       
        title: 'Other Safety Equipment',
        url: 'category',
      },
      {
        title: 'Pre-Rinse Units',
        url: 'category/JETFLO',
        issub: true
      },
      {
        title: 'Thermostatic Valves',
        url: 'category/TMV',
        isparent: true
      },
      {
        title: 'Sanitary Ware',
        url: 'category/SAHN',
        isparent: true
      },
      {
       
        title: 'Basins',
        url: 'category/BASI',
      },
      {
       
        title: 'Toilets',
        url: 'category/TOIL',
      }
      
    ]

    
    return menus2;
  }


  allMenus(){
    
    let menus1 = [
      {
        title: 'Tapware',
        url: 'category/TPWR',
        isparent: true
      },
      {
       
        title: 'Single Lever Mixer',
        url: 'category/SLM',
      },
      {
      
        title: 'Lever Action Tapware',
        url: 'category/LAT',
      },
      {
       
        title: 'Anti Ligature',
        url: 'category/ANTIV',
      },
      {
       
        title: 'Thermostatic Mixing Taps',
        url: 'category/THMT',
      },
      {
        title: 'Timed Flow',
        url: 'category/TFT',
        issub: true
      },
      {
        title: 'Bubblers',
        url: 'category/BUB',
      },
      {
        title: 'Timed Flow Taps',
        url: 'category/TFTAP',
      },
      {
        title: 'Timed Flow Shower',
        url: 'category/TFTSHO',
      },
      {
        title: 'Timed Flow Valves',
        url: 'category/TFTVAL',
      },
      {
        title: 'Electronic Tapware',
        url: 'category/ELEC',
        issub: true
      },
      {
        title: 'Laboratory Taps',
        url: 'category/DURA',
        issub: true
      },
      {
        title: 'Spouts & Outlets',
        url: 'category',
        issub: true
      }
      
    ]
  
    return menus1;
  }

  allCategories () {
    let categories = [
      {
        code: 'TPWR',
        parentCategory: 'tapware',
        url: 'category/TPWR',
        subParent: [
          {
            code: 'tf',
            parentCategory: 'Timed Flow',
            url: 'category/TFT',
            sub: [
              {
                code: 'BUB',
                parentCategory: 'Bubblers',
                url: 'category/BUB',
              },{
                code: 'TFTAP',
                parentCategory: 'timed flow taps',
                url: 'category/TFTAP',
              },{
                code: 'TFTSHO',
                parentCategory: 'timed flow showers',
                url: 'category/TFTSHO',
              }, {
                code: 'TFTVAL',
                parentCategory: 'timed flow valves',
                url: 'tegory/TFTVAL',
              }
            ]
          }, {
            code: 'ELEC',
            parentCategory: 'Electronic Tapware',
            url: 'category/ELEC',
            sub: []
          }, {
            code: 'DURA',
            parentCategory: 'Laboratory Taps',
            url: 'category/DURA',
            sub: []
          }, {
            code: 'tf',
            parentCategory: 'spouts & outlets',
            url: 'category',
            sub: []
          }, {
            code: 'SHOWR',
            parentCategory: 'showers',
            url: 'category/SHOWR',
            sub: []
          }
        ],
        sub: [
          {
            code: 'SLM',
            parentCategory: 'Single Lever Mixer',
            url: 'category/SLM',
          },{
            code: 'LAT',
            parentCategory: 'Lever Action Tapware',
            url: 'category/LAT',
          },{
            code: 'ANTIV',
            parentCategory: 'Anti Ligature',
            url: 'category/ANTIV',
          },{
            code: 'THMT',
            parentCategory: 'Thermostatic Mixing Taps',
            url: 'category/THMT',
          }
        ]
      }, {
        code: 'TMV',
        parentCategory: 'Thermostatic Valves',
        url: 'category/TMV',
        subParent: [
          {
            code: 'TFT',
            parentCategory: 'Timed Flow',
            url: 'category/TFT',
            sub: [
              {
                code: 'BUB',
                parentCategory: 'Bubblers',
                url: 'category/BUB',
              }
            ]
          }
        ],
        sub: [
          {
            code: 'SLM',
            parentCategory: 'Single Lever Mixer',
            url: 'category/SLM',
          }
        ]
      }
    ];

    return categories;
  }

}
