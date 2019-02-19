import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  showAddProjectModal = false;
  categories: any;
  products: any;
  productsCollection: AngularFirestoreCollection<{}>;

  constructor(
    private afs: AngularFirestore,
    private productServices: ProductsService,
    private httpClient: HttpClient
  ) {
    this.productsCollection = this.afs.collection('products', (ref) => ref.orderBy('dateCreated', 'desc'));
  }

  localstorage(collection) {
    if (collection == 'products') {
      return this.httpClient.get('https://firebasestorage.googleapis.com/v0/b/gentec-admin.appspot.com/o/products.json?alt=media&token=27e8bc46-0a87-4631-b73d-eb4b1b80a626');
      // return this.httpClient.get('https://firebasestorage.googleapis.com/v0/b/gentec-admin-development.appspot.com/o/products.json?alt=media&token=be6670ac-2a0a-431c-8a57-dc57b32d49b9');
    } else if (collection == 'solutions') {
      return this.httpClient.get('https://firebasestorage.googleapis.com/v0/b/gentec-admin.appspot.com/o/solutions.json?alt=media&token=4918ad6f-670a-454e-bec6-287a1eec008a');
    } else if(collection == 'banners') {
      return this.httpClient.get('https://firebasestorage.googleapis.com/v0/b/gentec-admin.appspot.com/o/banners.json?alt=media&token=a5ac86cd-925e-48fc-9ae9-a365c6466a04');
    }
    // switch (collection) {
    //   case 'products':
    //     // return this.httpClient.get('https://firebasestorage.googleapis.com/v0/b/gentec-admin.appspot.com/o/products.json?alt=media&token=27e8bc46-0a87-4631-b73d-eb4b1b80a626');
    //     if (typeof localStorage.getItem('products') === 'string') {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //     break;
    //   case 'solutions':
    //     if (typeof localStorage.getItem('solutions') === 'string') {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //     break;
    //   case 'banners':
    //     if (typeof localStorage.getItem('banners') === 'string') {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //     break;
    //   case 'posts':
    //     if (typeof localStorage.getItem('posts') === 'string') {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //     break;
    
    //   default:
    //     break;
    // }
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

  finalMenu1() {
    let finalMenu1 = [
      {
        categoryName: 'tapware',
        url: 'category/TPWR',
        sub: [
          {
            subName: 'single lever mixer',
            url:'category/SLM'
          }
        ]
      },
      {
        categoryName: 'antiligature systems',
        url: 'category/ANTIV',
        sub: []
      },
      {
        categoryName: 'time flow tapware',
        url: 'category/TFT',
        sub: [
          {
            subName: 'bubblers',
            url: 'category/BUB'
          },
          {
            subName: 'timed flow taps',
            url:'category/TFTAP'
          },
          {
            subName: 'timed flow shower',
            url: 'category/TFTSHO'
          },
          {
            subName: 'timed flow valves',
            url: 'category/TFTVAL'
          }
        ]
      },
      {
        categoryName: 'electronic tapware',
        url: 'category/ELEC',
        sub: [
          {
            subName: 'laboratory tapware',
            url: 'category/DURA',
            isBold: true
          }
        ]
      }
    ];
    return finalMenu1;
  }

  finalMenu2() {
    let finalMenu2 = [
      {
        categoryName: 'sanitary ware',
        url: 'category/SAHN',
        sub: [
          {
            subName: 'basins',
            url:'category/BASI'
          },
          {
            subName: 'tiolets',
            url: 'category/TOIL'
          }
        ]
      },
      {
        categoryName: 'safety showers & equipement',
        url: 'category/SSHOWE',
        sub: [
          {
            subName: 'safety showers',
            url: 'category/SSHOW'
          },
          {
            subName: 'emergency eye/face wash',
            url: 'category/EEFW'
          },
          {
            subName: 'other safety equipment',
            url: 'category/OSE'
          }
        ]
      },
      {
        categoryName: 'pre-rinse units',
        url: 'category/PRU',
        sub: []
      },
      {
        categoryName: 'showers',
        url: 'category/SHOWR',
        sub: [
          {
            subName: 'spouts and outlets',
            url: 'category/SAO',
            isBold: true
          }
        ]
      }
    ];
    return finalMenu2;
  }

  finalMenu3() {
    let finalMenu3 = [
      {
        categoryName: 'thermostatics',
        url: 'category/TH',
        sub: [
          {
            subName: 'thermostatics mixing taps',
            url:'category/TMT'
          },
          {
            subName: 'thermostatics mixing valves',
            url: 'category/TMV'
          }
        ]
      },
      {
        categoryName: 'rails & accessible equipment',
        url: 'category/RAE',
        sub: [
          {
            subName: 'anti microbial',
            url: 'category/AM'
          },
          {
            subName: 'stainless steel',
            url: 'category/SS'
          }
        ]
      },
      {
        categoryName: 'bathroom accessories',
        url: 'category/BA',
        sub: []
      },
      {
        categoryName: 'grate seal',
        url: 'category/GRTS',
        sub: []
      }
    ];
    return finalMenu3;
  }

  footer() {
    return {
        menu1: [
          {
            categoryName: 'tapware',
            url: 'category/TPWR'
          },
          {
            subName: 'single lever mixer',
            url: 'category/SLM'
          },
          {

            categoryName: 'Lever Action Tapware',
            url: 'category/LAT',
          },
          {
            categoryName: 'time flow tapware',
            url: 'category/TFT'
          },
          {
            categoryName: 'timed flow',
            url: 'category/TFT'
          },
          {
            categoryName: 'bubblers',
            url: 'category/BUB'
          },
          {
            categoryName: 'timed flow taps',
            url: 'category/TFTAP'
          },
          {
            categoryName: 'timed flow shower',
            url: 'category/TFTSHO'
          },
          {
            categoryName: 'timed flow valves',
            url: 'category/TFTVAL'
          }
        ],
        menu2: [
          {
            categoryName: 'antiligature systems',
            url: 'category/SAHN'
          },
          {
            categoryName: 'electronic tapware',
            url: 'category/ELEC'
          },
          {
            categoryName: 'pre-rinse units',
            url: 'category/PRU'
          },
          {
            categoryName: 'sanitary ware',
            url: 'category/SAHN'
          },
          {
            categoryName: 'basins',
            url: 'category/BASI'
          },
          {
            categoryName: 'tiolets',
            url: 'category/TOIL'
          },
          {
            categoryName: 'rails & accessible',
            url: 'category/RAE'
          },
          // {
          //   categoryName: 'safety showers & equipement',
          //   url: 'category/SSHOWE'
          // },
          // {
          //   categoryName: 'emergency eye/face wash',
          //   url: 'category/EEFW'
          // },
          // {
          //   categoryName: 'other safety equipment',
          //   url: 'category/OSE'
          // },
        ],
        menu3: [
          {
            categoryName: 'thermostatics',
            url: 'category/TH'
          },
          {
            categoryName: 'laboratory tapware',
            url: 'category/DURA'
          },
          {
            categoryName: 'spouts and outlets',
            url: 'category/SAO'
          },
          {
            categoryName: 'showers',
            url: 'category/SHOWR'
          },
          {
            categoryName: 'safety showers',
            url: 'category/SSHOW'
          },
          {
            categoryName: 'bathroom accessories',
            url: 'category/BA'
          },
          {
            categoryName: 'grate seal',
            url: 'category/GRTS'
          },
          // {
          //   subName: 'thermostatics mixing taps',
          //   url: 'category/TMT'
          // },
          // {
          //   subName: 'thermostatics mixing valves',
          //   url: 'category/TMV'
          // },
          // {
          //   categoryName: 'rails & accessible equipment',
          //   url: 'category/RAE'
          // },
          // {
          //   subName: 'anti microbial',
          //   url: 'category/AM'
          // },
          // {
          //   subName: 'stainless steel',
          //   url: 'category/SS'
          // }
        ],
        others: [
          {
            categoryName: 'about us',
            url: ''
          },
          {
            categoryName: 'warranty',
            url: ''
          },
          {
            categoryName: 'news',
            url: 'news/'
          },
          {
            categoryName: 'distribution',
            url: ''
          }
        ]
      }
  }

}
