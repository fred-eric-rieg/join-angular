import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Task } from '../models/task.class';
import { User } from '../models/user.class';
import { deleteDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  users!: Observable<any>;
  tasks!: Observable<any>;
  categories!: Observable<any>;


  constructor(private firestore: Firestore) {
    this.getAllUsers();
    this.getAllTasks();
    this.getCategories();
  }


  /**
   * Creates a task in Firestore collection "tasks".
   * @param task as Task
   */
  createTask(task: Task) {
    const collectionInstance = collection(this.firestore, 'tasks');
    const docRef = doc(collectionInstance);
    task.id = docRef.id;

    setDoc(docRef, task.toJSON()).then(() => {
      console.log('Task created successfully! Task ID: ', task.id);
    }).catch((error: any) => {
      console.log(error);
    });
  }

  /**
   * Gets all tasks from Firestore collection "tasks".
   */
  getAllTasks() {
    const collectionInstance = collection(this.firestore, 'tasks');
    this.tasks = collectionData(collectionInstance);
  }

  /**
   * Returns a specific task from Firestore collection "tasks" according to the id.
   * @param id as string
   */
  getSpecificTask(id: string) {
    let task: object = [];
    const collectionInstance = collection(this.firestore, 'tasks');
    collectionData(collectionInstance, { idField: 'id' }).subscribe(subscribedTasks => {
      subscribedTasks.forEach((singleTask) => {
        if (singleTask['id'] === id) {
          task = singleTask;
        } else {
          task = [];
        }
      });
    });
    return task;
  }

  /**
   * Updates a task in Firestore collection "tasks" according to the id.
   * @param task as Task
   */
  setTask(task: Task) {
    const documentInstance = doc(this.firestore, 'tasks', task.id);
    updateDoc(documentInstance, task.toJSON()).then(() => {
      console.log('Task updated successfully!');
    }
    ).catch((error: any) => {
      console.log(error);
    }
    );
  }

  /**
   * Deletes a task in Firestore collection "tasks" according to the id.
   * @param task as Task
   */
  deleteTask(task: Task) {
    const documentInstance = doc(this.firestore, 'tasks', task.id);
    deleteDoc(documentInstance).then(() => {
      console.log('Task deleted successfully!');
    }
    ).catch((error: any) => {
      console.log(error);
    }
    );
  }

  /**
   * Creates a user in Firestore collection "users".
   */
  createUser(user: User) {
    const collectionInstance = collection(this.firestore, 'users');
    addDoc(collectionInstance, user.toJSON()).then(() => {
      console.log('User created successfully!');
    }).catch((error: any) => {
      console.log(error);
    });
  }

  /**
   * Gets all users from Firestore collection "users".
   */
  getAllUsers() {
    const collectionInstance = collection(this.firestore, 'users');
    this.users = collectionData(collectionInstance);
  }

  /**
   * Returns a specific user from Firestore collection "users" according to the id.
   * @param id as string
   */
  getSpecificUser(id: string) {
    let user: object = [];
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, { idField: 'userId' }).subscribe(subscribedUsers => {
      subscribedUsers.forEach((singleUser) => {
        if (singleUser['userId'] === id) {
          user = singleUser;
        } else {
          user = [];
        }
      });
    });
    return user;
  }


  getCategories() {
    const collectionInstance = collection(this.firestore, 'categories');
    this.categories = collectionData(collectionInstance);
  }
}
