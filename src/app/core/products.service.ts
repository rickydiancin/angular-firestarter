import { Injectable, Output, EventEmitter } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { VariablesService } from './variables.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  @Output() event = new EventEmitter;

  productsCollection: AngularFirestoreCollection<any>;
  productDocument:   AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore,
    private auth: AuthService,
    public http: HttpClient,
    private vs: VariablesService
    ) {
    // Add collections here..
    this.productsCollection = this.afs.collection('products', (ref) => ref.orderBy('dateCreated', 'desc').limit(15));
  }

  getFile(): Observable<any> {
    return this.http.get('../../assets/datafiles/categories.json');
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.productsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getAllPosts(){
    //return this.afs.collection('categories', (ref) => ref.where('parent', "==", id).orderBy('categoryName')).snapshotChanges().pipe(
    return this.afs.collection('posts',  (ref) => ref.where('category', "==", 'news').orderBy('dateCreated')).snapshotChanges().pipe(
        map((actions) => {
            return actions.map((a) => {
            const data = a.payload.doc.data();
            return { id: a.payload.doc.id, ...data };
            });
        }));
}
getAllAbout(){
  //return this.afs.collection('categories', (ref) => ref.where('parent', "==", id).orderBy('categoryName')).snapshotChanges().pipe(
  return this.afs.collection('posts',  (ref) => ref.where('category', "==", 'about').orderBy('dateCreated')).snapshotChanges().pipe(
      map((actions) => {
          return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
          });
      }));
}
  getAllProducts(){
    return this.afs.collection('products', (ref) => ref.limit(50)).snapshotChanges().pipe(
        map((actions) => {
            return actions.map((a) => {
            const data = a.payload.doc.data();
            return { id: a.payload.doc.id, ...data };
            });
        }));
}

  getAllProductsByCategory(){
    return this.afs.collection('products', (ref) => ref.limit(15)).snapshotChanges().pipe(
        map((actions) => {
            return actions.map((a) => {
            const data = a.payload.doc.data();
            return { id: a.payload.doc.id, ...data };
            });
        }));
}

  getAllCategoryProducts(id){
    return this.afs.collection('products', (ref) => ref.where('categories', "array-contains", id).limit(2) ).snapshotChanges().pipe(
        map((actions) => {
            return actions.map((a) => {
            const data = a.payload.doc.data();
            return { id: a.payload.doc.id, ...data };
            });
        }));
}

getAllCategories(callback){
  return this.afs.collection('categories', (ref) => ref.orderBy('categoryName')).snapshotChanges().pipe(
      map((actions) => {
          return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
          });
      })).subscribe(res => {
          // console.log(res);
          res.forEach((c:any) => {
            this.getSubCategory(c['categoryCode'], callback => {
                      if(callback.length) {
                        c.sub = callback;
                      } else {
                        c.sub = null;
                      }
                  })
            // c['categoryCode']
              // if(c['parent'] != ''){
              //     this.getCategory(c['parent'], callback => {
              //         c['parentData'] = callback;
              //     })
              // }
          })
          return callback(res);
      })
}
getSubCategory(id, callback){
  // console.log(id)
  return this.afs.collection('categories', (ref) => ref.where('parent', "==", id).orderBy('categoryName')).snapshotChanges().pipe(
    map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        return { id: a.payload.doc.id, ...data };
      });
    })
  ).subscribe(res => {
      return callback(res);
  })
}

getCategory(id, callback){
  // console.log(id)
  return this.afs.doc('categories/'+ id).valueChanges().subscribe(res => {
      return callback(res);
  })
}

getCategoryByArray(id) {
  return this.afs.doc('categories/' + id).valueChanges();
}

  getProduct(id) {
    return this.afs.doc<any>(`products/${id}`);
  }

  getProductByArray(id: string) {
    // return this.afs.doc<any>(`products/${id}`, ref => ref);
    // return this.afs.collection('products', (ref) => ref.where('categories', "array-contains", id).limit(2)).snapshotChanges();
    return this.afs.collection('products', (ref) => ref.where('categories', "array-contains", id).limit(2)).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  getSolutionProductByArray(id: string) {
    // return this.afs.doc<any>(`products/${id}`, ref => ref);
    // return this.afs.collection('products', (ref) => ref.where('categories', "array-contains", id).limit(2)).snapshotChanges();
    return this.afs.collection('products', (ref) => ref.where('solutions', "array-contains", id)).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  createProduct(content: string) {
    const product = {
      content,
      hearts: 0,
      time: new Date().getTime(),
    };
    return this.productsCollection.add(product);
  }

  updateProduct(id: string, data: any) {
    return this.getProduct(id).update(data);
  }

  deleteProduct(id: string) {
    return this.getProduct(id).delete();
  }

  // solutions ========================

  getAllSolutions() {
    return this.afs.collection('solutions').snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      }));
  }
  getAllBanners() {
    return this.afs.collection('banners').snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      }));
  }

  getSolution(id) {
    return this.afs.doc('solutions/' + id).valueChanges();
  }

  newProjects(data) {
    return this.afs.doc('projects/' + data.code).set(data);
  }

  deleteProject(id) {
    return this.afs.doc<any>('projects/' + id).delete();
  }

  getAllProjects() {
    return this.afs.collection('projects').snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      }));
  }

  getAllProjectsByUser(id) {
    return this.afs.collection('projects', (ref) => ref.where('createdBy','==',id)).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      }));
  }

  getSelectedProjectProducts(id) {
    return this.afs.collection('projectproducts', (ref) => ref.where('projects', "==", id)).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      }));
  }

  getProjects(id) {
    return this.afs.doc('projects/' + id).valueChanges();
  }

  addProductToProject(product) {
    return this.afs.collection(`projectproducts`).add(product);
  }

  getAllProjectProducts(product) {
    console.log(this.auth.user)
    return this.afs.collection('projectproducts', (ref) => ref.where('userID', "==", this.auth.user.uid).where('productCode', '==', product.productCode)).snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      }));
  }

  getProjectProduct(id) {
    return this.afs.doc('projectproducts/' + id).valueChanges();
  }

  deleteToProject(id) {
    return this.afs.doc<any>('projectproducts/' + id).delete();
  }

  createInquires(data) {
    return this.afs.collection('inquiries').add(data);
  }

  // getfile() {
  //   this.http.get('https://firebasestorage.googleapis.com/v0/b/gentec-admin.appspot.com/o/categories.json?alt=media&token=e5da0331-7c06-4221-9c21-4b4483618f0f').subscribe((data) => {
  //     console.log(data)
  //   })
  // }

  getProductsWithCategory(callback) {
    return this.http.get('https://firebasestorage.googleapis.com/v0/b/gentec-admin.appspot.com/o/products.json?alt=media&token=27e8bc46-0a87-4631-b73d-eb4b1b80a626')
    .subscribe(async (res:any) => {
      await res.forEach(products => {
        let c = []
        products.categories = products.categories.split(';').join(',').match(/(?=\S)[^,]+?(?=\s*(,|$))/g);
        products.categories.map(async (category) => {
          await this.getCategoryByArrayProduct(category, cb => {
            if (cb) {
              c.push(cb.categoryName.toLowerCase());
              products['categoryName'] = c;
            } else {
              products['categoryName'] = [];
            }
          })
        })
      });
      return callback(res);
    },err => console.log(err))
  }

  getCategoryByArrayProduct(id, cb) {
    return this.afs.doc('categories/' + id).valueChanges().subscribe(async (res) => {
      return await cb(res)
    })
  }

}
