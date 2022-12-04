import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
	collection,
	doc,
	docData,
	DocumentReference,
	CollectionReference,
	Firestore,
	onSnapshot,
	query,
	where,
	Unsubscribe,
	Query,
	DocumentData,
	collectionData,
	collectionChanges,
	docSnapshots,
	GeoPoint,
	FieldPath,
	updateDoc
} from '@angular/fire/firestore';

//Al poner el inyectable ya toda la app conoce este servicio
//un servicio brinda funciones genericas pero no especificas
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore,
    private firestore: Firestore) { }

  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
}

getDoc<tipo>(path: string, id: string) {
  const collection = this.database.collection<tipo>(path);
  return collection.doc(id).valueChanges();
}

deleteDoc(path: string, id: string) {
  const collection = this.database.collection(path);
  return collection.doc(id).delete();
}

updateDoc(data: any, path: string, id: string) {
  const collection = this.database.collection(path);
  return collection.doc(id).update(data);
}

getId() {
  return this.database.createId();
}

getCollection<tipo>(path: string) {
  const collection = this.database.collection<tipo>(path);
  return collection.valueChanges();
}

getCollectionQuery<tipo>(path: string, parametro: string, condicion: any, busqueda: string) {
  const collection = this.database.collection<tipo>(path, 
    ref => ref.where( parametro, condicion, busqueda));
  return collection.valueChanges();
}

getCollectionAll<tipo>(path, parametro: string, condicion: any, busqueda: string, startAt: any) {
  if (startAt == null) {
    startAt = new Date();
  }
  const collection = this.database.collectionGroup<tipo>(path, 
    ref => ref.where( parametro, condicion, busqueda)
              .orderBy('fecha', 'desc')
              .limit(1)
              .startAfter(startAt)
    );
  return collection.valueChanges();
}

getCollectionPaginada<tipo>(path: string, limit: number, startAt: any) {
  if (startAt == null) {
    startAt = new Date();
  }
  const collection = this.database.collection<tipo>(path, 
    ref => ref.orderBy('fecha', 'desc')
              .limit(limit)
              .startAfter(startAt)
    );
  return collection.valueChanges();
}

getUserById(id) {
  const userDocRef = doc(this.firestore, `users/${id}`);
  return docData(userDocRef, { idField: 'id' });
}

}
