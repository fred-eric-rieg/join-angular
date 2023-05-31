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

  /**
   * Creates a task in Firestore collection "tasks".
   */
  createTask() {
    const collectionInstance = collection(this.firestore, 'tasks');
    addDoc(collectionInstance, this.task.toJSON()).then(() => {
      console.log('Task created successfully!');
    }).catch((error: any) => {
      console.log(error);
    });
  }

  /**
   * Creates a user in Firestore collection "users".
   */
  createUser() {
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, this.user.toJSON()).then(() => {
      console.log('User created successfully!');
    }).catch((error: any) => {
      console.log(error);
    });
  }
}
