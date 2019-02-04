import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsCollection: AngularFirestoreCollection<any>;
  productDocument:   AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    // Add collections here..
    this.productsCollection = this.afs.collection('products', (ref) => ref.orderBy('dateCreated', 'desc').limit(2));
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
    return this.afs.collection('products').snapshotChanges().pipe(
        map((actions) => {
            return actions.map((a) => {
            const data = a.payload.doc.data();
            return { id: a.payload.doc.id, ...data };
            });
        }));
}

  getAllProductsByCategory(){
    return this.afs.collection('products', (ref) => ref.limit(2)).snapshotChanges().pipe(
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
  getProduct(id: string) {
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
    console.log(id)
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

}
