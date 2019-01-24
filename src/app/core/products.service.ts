import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsCollection: AngularFirestoreCollection<any>;
  productDocument:   AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
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
  getAllProducts(){
    return this.afs.collection('products').snapshotChanges().pipe(
        map((actions) => {
            return actions.map((a) => {
            const data = a.payload.doc.data();
            return { id: a.payload.doc.id, ...data };
            });
        }));
}

getAllCategories(callback){
  return this.afs.collection('categories').snapshotChanges().pipe(
      map((actions) => {
          return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
          });
      })).subscribe(res => {
          console.log(res);
          res.forEach(c => {
              if(c['parent'] != ''){
                  this.getCategory(c['parent'], callback => {
                      c['parentData'] = callback;
                  })
              }
          })
          return callback(res);
      })
}
getCategory(id, callback){
  console.log(id)
  return this.afs.doc('categories/'+id).valueChanges().subscribe(res => {
      return callback(res);
  })
}
  getProduct(id: string) {
    return this.afs.doc<any>(`products/${id}`);
  }

  getProductByArray(id: string) {
    // return this.afs.doc<any>(`products/${id}`, ref => ref);
    // return this.afs.collection('products', (ref) => ref.where('categories', "array-contains", id).limit(2)).snapshotChanges();
    return this.afs.collection('products', (ref) => ref.where('categories', "array-contains", id)).snapshotChanges().pipe(
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

  getSolution(id) {
    console.log(id)
    return this.afs.doc('solutions/' + id).valueChanges();
  }
}
