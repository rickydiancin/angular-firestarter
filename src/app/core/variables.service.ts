import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  showAddProjectModal = false;
  categories: any;

  constructor() {}

  allMenu(){
    let menus = [
      
    ]
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
