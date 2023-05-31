import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Task } from '../models/task.class';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  task!: Task;
  user!: User;

  constructor(private firestore: Firestore) { }


  createTask() {
    const collectionInstance = collection(this.firestore, 'tasks');
    addDoc(collectionInstance, this.task.toJSON()).then(() => {
      console.log('Task created successfully!');
    }).catch((error: any) => {
      console.log(error);
    });
  }
}
