import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DocumentsDriverService {
  documents = [];
  constructor(
    private db: AngularFirestore
  ) { }

  public getDocumnets(documentId: string){    
    return this.db.collection('drivers').doc(documentId).snapshotChanges();    
  }
}
