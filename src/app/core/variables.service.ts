import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    
      default:
        break;
    }
  }

  allMenus3(){
    let menus3 = [
      {
        title: 'Rails & Accessible Equipment',
        url: 'category',
        isparent: true
      },
      {
        title: 'Anti Microbial',
        url: 'category',
       
      },
      {
       
        title: 'Stainless Stell',
        url: 'category',
      },
      {
        title: 'Bathroom Accessories',
        url: 'category',
        isparent: true
      },
      {
        title: 'Grate Seal',
        url: 'category',
        isparent: true
      }
      
    ]

    
    return menus3;
  }


  allMenus2(){
    let menus2 = [
      {
        title: 'Showers',
        url: 'category',
        issub: true
      },
      {
        title: 'Safety Showers & Equipment',
        url: 'category',
        issub: true
      },
      {
       
        title: 'Safety Showers',
        url: 'category',
      },
      {
      
        title: 'Eyewash Combination',
        url: 'category',
      },
      {
       
        title: 'Other Safety Equipment',
        url: 'category',
      },
      {
        title: 'Pre-Rinse Units',
        url: 'category',
        issub: true
      },
      {
        title: 'Thermostatic Valves',
        url: 'category',
        isparent: true
      },
      {
        title: 'Sanitary Ware',
        url: 'category',
        isparent: true
      },
      {
       
        title: 'Basins',
        url: 'category',
      },
      {
       
        title: 'Toilets',
        url: 'category',
      }
      
    ]

    
    return menus2;
  }


  allMenus(){
    
    let menus1 = [
      {
        title: 'Tapware',
        url: 'category/twr',
        isparent: true
      },
      {
       
        title: 'Single Lever Mixer',
        url: 'category',
      },
      {
      
        title: 'Lever Action Tapware',
        url: 'category',
      },
      {
       
        title: 'Anti Ligature',
        url: 'category',
      },
      {
       
        title: 'Thermostatic Mixing Taps',
        url: 'category',
      },
      {
        title: 'Timed Flow',
        url: 'category',
        issub: true
      },
      {
        title: 'Bubblers',
        url: 'category',
      },
      {
        title: 'Timed Flow Taps',
        url: 'category',
      },
      {
        title: 'Timed Flow Shower',
        url: 'category',
      },
      {
        title: 'Timed Flow Valves',
        url: 'category',
      },
      {
        title: 'Electronic Tapware',
        url: 'category',
        issub: true
      },
      {
        title: 'Laboratory Taps',
        url: 'category',
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
        code: 'twr',
        parentCategory: 'tapware',
        url: '',
        subParent: [
          {
            code: 'tf',
            parentCategory: 'Timed Flow',
            url: '',
            sub: [
              {
                code: 'twr',
                parentCategory: 'Bubblers',
                url: '',
              },{
                code: 'twr',
                parentCategory: 'timed flow taps',
                url: '',
              },{
                code: 'twr',
                parentCategory: 'timed flow showers',
                url: '',
              }, {
                code: 'twr',
                parentCategory: 'timed flow valves',
                url: '',
              }
            ]
          }, {
            code: 'tf',
            parentCategory: 'Electronic Tapware',
            url: '',
            sub: []
          }, {
            code: 'tf',
            parentCategory: 'Laboratory Taps',
            url: '',
            sub: []
          }, {
            code: 'tf',
            parentCategory: 'spouts & outlets',
            url: '',
            sub: []
          }, {
            code: 'tf',
            parentCategory: 'showers',
            url: '',
            sub: []
          }
        ],
        sub: [
          {
            code: 'twr',
            parentCategory: 'Single Lever Mixer',
            url: '',
          },{
            code: 'twr',
            parentCategory: 'Lever Action Tapware',
            url: '',
          },{
            code: 'twr',
            parentCategory: 'Anti Ligature',
            url: '',
          },{
            code: 'twr',
            parentCategory: 'Thermostatic Mixing Taps',
            url: '',
          }
        ]
      }, {
        code: 'twr',
        parentCategory: 'Thermostatic Valves',
        url: '',
        subParent: [
          {
            code: 'tf',
            parentCategory: 'Timed Flow',
            url: '',
            sub: [
              {
                code: 'twr',
                parentCategory: 'Bubblers',
                url: '',
              }
            ]
          }
        ],
        sub: [
          {
            code: 'twr',
            parentCategory: 'Single Lever Mixer',
            url: '',
          }
        ]
      }
    ];

    return categories;
  }

}
