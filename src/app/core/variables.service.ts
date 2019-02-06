import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  showAddProjectModal = false;
  categories: any;

  constructor() {}

  allMenus3(){
    let menus3 = [
      {
        title: 'Rails & Accessible Equipment',
        url: 'category/twr',
        isparent: true
      },
      {
        title: 'Anti Microbial',
        url: 'category/twr',
       
      },
      {
       
        title: 'Stainless Stell',
        url: 'category/twr',
      },
      {
        title: 'Bathroom Accessories',
        url: 'category/twr',
        isparent: true
      },
      {
        title: 'Grate Seal',
        url: 'category/twr',
        isparent: true
      }
      
    ]

    
    return menus3;
  }


  allMenus2(){
    let menus2 = [
      {
        title: 'Showers',
        url: 'category/twr',
        issub: true
      },
      {
        title: 'Safety Showers & Equipment',
        url: 'category/twr',
        issub: true
      },
      {
       
        title: 'Safety Showers',
        url: 'category/twr',
      },
      {
      
        title: 'Eyewash Combination',
        url: 'category/twr',
      },
      {
       
        title: 'Other Safety Equipment',
        url: 'category/twr',
      },
      {
        title: 'Pre-Rinse Units',
        url: 'category/twr',
        issub: true
      },
      {
        title: 'Thermostatic Valves',
        url: 'category/twr',
        issub: true
      },
      {
        title: 'Sanitary Ware',
        url: 'category/twr',
        issub: true
      },
      {
       
        title: 'Basins',
        url: 'category/twr',
      },
      {
       
        title: 'Toilets',
        url: 'category/twr',
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
        url: 'category/twr',
      },
      {
      
        title: 'Lever Action Tapware',
        url: 'category/twr',
      },
      {
       
        title: 'Anti Ligature',
        url: 'category/twr',
      },
      {
       
        title: 'Thermostatic Mixing Taps',
        url: 'category/twr',
      },
      {
        title: 'Timed Flow',
        url: 'category/twr',
        issub: true
      },
      {
        title: 'Bubblers',
        url: 'category/twr',
      },
      {
        title: 'Timed Flow Taps',
        url: 'category/twr',
      },
      {
        title: 'Timed Flow Shower',
        url: 'category/twr',
      },
      {
        title: 'Timed Flow Valves',
        url: 'category/twr',
      },
      {
        title: 'Electronic Tapware',
        url: 'category/twr',
        issub: true
      },
      {
        title: 'Laboratory Taps',
        url: 'category/twr',
        issub: true
      },
      {
        title: 'Spouts & Outlets',
        url: 'category/twr',
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
