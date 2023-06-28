import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Task } from '../models/task.class';
import { User } from '../models/user.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  users!: Observable<Array<any>>;
  tasks!: Observable<Array<any>>;
  categories!: Observable<Array<any>>;
  

  constructor(private firestore: Firestore) {
    this.getAllUsers();
    this.getAllTasks();
    this.getCategories();
  }


  /**
   * Creates a task in Firestore collection "tasks".
   * @param task as object
   */
  createTask(task: Task) {
    const collectionInstance = collection(this.firestore, 'tasks');
    const docRef = doc(collectionInstance);
    task.id = docRef.id;

    setDoc(docRef, task).then(() => {
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
  updateTask(task: Task) {
    const documentInstance = collection(this.firestore, 'tasks');
    const docRef = doc(documentInstance, task.id);

    setDoc(docRef, task).then(() => {
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
  deleteTask(id: string) {
    const documentInstance = doc(this.firestore, 'tasks', id);
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
    const docRef = doc(collectionInstance);
    user.userId = docRef.id;

    setDoc(docRef, user.toJSON()).then(() => {
      console.log('User created successfully!');
    }).catch((error: any) => {
      console.log(error);
    });
  }


  updateUser(user: User) {
    const documentInstance = collection(this.firestore, 'users');
    const docRef = doc(documentInstance, user.userId);

    setDoc(docRef, user).then(() => {
      console.log('User updated successfully!');
    }
    ).catch((error: any) => {
      console.log(error);
    }
    );
  }


  /**
   * Gets all users from Firestore collection "users".
   */
  getAllUsers() {
    const collectionInstance = collection(this.firestore, 'users');
    this.users = collectionData(collectionInstance);
  }


  getCategories() {
    const collectionInstance = collection(this.firestore, 'categories');
    this.categories = collectionData(collectionInstance);
  }


  createCategory(category: string, color: string) {
    const collectionInstance = collection(this.firestore, 'categories');
    addDoc(collectionInstance, { name: category, color: color }).then(() => {
      console.log('Category created successfully!');
    }).catch((error: any) => {
      console.log(error);
    });
  }
}
