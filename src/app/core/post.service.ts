import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getAllPostsByCategory(category, limit?:number) {
    if(limit) {
      return this.afs.collection('posts', (ref) => ref.where('category', '==', category).orderBy('dateCreated', 'desc').limit(limit)).snapshotChanges().pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            return { id: a.payload.doc.id, ...data };
          });
        }));
    } else {
      return this.afs.collection('posts', (ref) => ref.where('category', '==', category).orderBy('dateCreated', 'desc')).snapshotChanges().pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            return { id: a.payload.doc.id, ...data };
          });
        }));
    }
  }

  getSinglePost(id) {
      return this.afs.doc('posts/' + id).valueChanges();
  }

  // getAllPosts() {
  //   //return this.afs.collection('categories', (ref) => ref.where('parent', "==", id).orderBy('categoryName')).snapshotChanges().pipe(
  //   return this.afs.collection('posts', (ref) => ref.where('category', "==", 'news').orderBy('dateCreated')).snapshotChanges().pipe(
  //     map((actions) => {
  //       return actions.map((a) => {
  //         const data = a.payload.doc.data();
  //         return { id: a.payload.doc.id, ...data };
  //       });
  //     }));
  // }
  // getAllAbout() {
  //   //return this.afs.collection('categories', (ref) => ref.where('parent', "==", id).orderBy('categoryName')).snapshotChanges().pipe(
  //   return this.afs.collection('posts', (ref) => ref.where('category', "==", 'about').orderBy('dateCreated')).snapshotChanges().pipe(
  //     map((actions) => {
  //       return actions.map((a) => {
  //         const data = a.payload.doc.data();
  //         return { id: a.payload.doc.id, ...data };
  //       });
  //     }));
  // }

}
