import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent {

  // For setting the priority buttons to default (low = true).
  lowPrio: boolean = true;
  mediumPrio: boolean = false;
  urgentPrio: boolean = false;

  // Toggle variables for input fields.
  expandedCategory: boolean = false;
  expandedAssigned: boolean = false;

  // Temporary variables for category.
  availableColors: any = ['yellow', 'purple', 'pink', 'brown', '#556B2F', '#E9967A', '#4682B4', '#FF6347', '#FFFACD', '#E6E6FA', '#4B0082', '#CD5C5C', '#DAA520', '#BDB76B', '#7FFFD4'];
  selectedCategory: any = ['Select a category', ''];
  creatingCategory: boolean = false;
  newCategory: string = '';
  newColor: string = this.availableColors[0];
  colorSelector: boolean = false;

  // Temporary variables for assigned users.
  assignedUsers: any = [];

  // Temporary variables for subtasks.
  subtasks: any = [];
  subtask: string = '';

  // Temporary storage for fetched data from Firestore
  categories: any = [];
  users: any = [];

  // The form group data collection
  taskForm!: FormGroup;


  constructor(private firebaseService: FirebaseService, private formBuilder: FormBuilder, private router: Router) { }


  ngOnInit() {
    this.setTaskFormGroup();
    this.subscribeToCategories();
    this.subscribeToUsers();
    this.taskForm.valueChanges.subscribe();
  }


  /**
   * Initial setup for the taskForm group with values and validators.
   */
  setTaskFormGroup() {
    this.taskForm = this.formBuilder.group({
      id: '',
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['todo'],
      creationDate: [new Date, [Validators.required]],
      lastUpdated: [new Date],
      priority: ['low', [Validators.required]],
      creatorId: ['guest'],
      dueDate: [, [Validators.required]],
      category: ['', [Validators.required]],
      assignedTo: [[], [Validators.required]],
      subtasks: [[]]
    });
  }


  /**
   * Observing changes on categories and copying them into categories variable.
   */
  subscribeToCategories() {
    this.firebaseService.categories.subscribe(categories => {
      categories.forEach((category: any) => {
        this.categories.push(category);
      });
    });
  }


  /**
   * Observing changes on users and copying them into users variable.
   */
  subscribeToUsers() {
    this.firebaseService.users.subscribe(users => {
      users.forEach((user: any) => {
        this.users.push(user);
      });
    });
  }


  /**
   * Sets priority in taskForm group depending on which priority-button the user clicked.
   * @param prio as string
   */
  setPrio(prio: string) {
    if (prio === 'low') {
      this.setLowPrio();
    } else if (prio === 'medium') {
      this.setMediumPrio();
    } else if (prio === 'high') {
      this.setHighPrio();
    }
    this.taskForm.patchValue({ priority: prio });
  }


  setLowPrio() {
    this.lowPrio = true;
    this.mediumPrio = false;
    this.urgentPrio = false;
  }


  setMediumPrio() {
    this.lowPrio = false;
    this.mediumPrio = true;
    this.urgentPrio = false;
  }


  setHighPrio() {
    this.lowPrio = false;
    this.mediumPrio = false;
    this.urgentPrio = true;
  }


  /**
   * Toggle expansion of input field "category".
   */
  expandCategory() {
    if (this.expandedCategory) {
      this.expandedCategory = false;
    } else {
      this.expandedCategory = true;
    }
  }


  /**
   * Stores the user-selected category in the variable selectedCategory.
   * @param index as number
   */
  selectCategory(index: number) {
    this.selectedCategory = [this.categories[index].name, this.categories[index].color];
    this.taskForm.patchValue({ category: this.selectedCategory });
    this.expandedCategory = false;
  }


  toggleNewCategory() {
    if (this.creatingCategory) {
      this.newCategory = '';
      this.creatingCategory = false;
    } else {
      this.creatingCategory = true;
    }
  }


  toggleColorSelector() {
    if (this.colorSelector) {
      this.colorSelector = false;
    } else {
      this.colorSelector = true;
    }
  }


  selectColor(index: number) {
    this.newColor = this.availableColors[index];
    this.colorSelector = false;
  }


  /**
   * Setting selectedCategory's values to newCategory and newColor and updating firestore accordingly.
   */
  createNewCategory() {
    if (this.newCategory) {
      this.selectedCategory = [this.newCategory, this.newColor];
      this.taskForm.patchValue({ category: this.selectedCategory });
      this.firebaseService.createCategory(this.newCategory, this.newColor);
      this.creatingCategory = false;
      this.newCategory = '';
      this.expandedCategory = false;
    }
  }


  /**
   * Toggle expansion of input field "assign to".
   */
  expandAssigned() {
    if (this.expandedAssigned) {
      this.expandedAssigned = false;
    } else {
      this.expandedAssigned = true;
    }
  }


  /**
   * Add or remove a user from the assignedUsers array via the userId.
   * Updating taskForm accordingly.
   * @param userId as string
   */
  toggleAssignment(userId: string) {
    if (this.isAssigned(userId)) {
      this.removeUserAndUpdateTaskForm(userId);
    } else {
      this.assignUserAndUpdateTaskForm(userId);
    }
  }


  removeUserAndUpdateTaskForm(userId: string) {
    this.assignedUsers.splice(this.assignedUsers.findIndex((user: any) => user.id === userId), 1);
    this.taskForm.patchValue({ assignedTo: this.assignedUsers });
  }


  assignUserAndUpdateTaskForm(userId: string) {
    this.users.forEach((user: any) => {
      if (user.userId === userId) {
        this.assignedUsers.push({ id: user.userId, name: user.firstName + ' ' + user.lastName, color: user.color });
        this.taskForm.patchValue({ assignedTo: this.assignedUsers });
      }
    });
  }


  /**
   * Checks, if a user is listed in the assignedUsers array via the userId.
   * @param userId as string
   * @returns true or false
   */
  isAssigned(userId: string) {
    let assigned = false;
    this.assignedUsers.forEach((user: any) => {
      if (user.id === userId) {
        assigned = true;
      }
    });
    return assigned;
  }


  returnFirstLetter(name: string) {
    let cleanName = name.trim().toUpperCase();
    if (cleanName.includes(' ')) {
      return cleanName.charAt(0) + cleanName.charAt(cleanName.indexOf(' ') + 1);
    } else {
      return cleanName.charAt(0);
    }
  }


  addSubtask() {
    if (this.subtask) {
      this.subtasks.push({ description: this.subtask, status: 0 });
      this.taskForm.patchValue({ subtasks: this.subtasks });
      this.subtask = '';
    }
  }


  toggleSubtaskStatus(index: number) {
    this.subtasks[index].status === 0 ? this.subtasks[index].status = 1 : this.subtasks[index].status = 0;
    this.taskForm.patchValue({ subtasks: this.subtasks });
  }


  deleteSubtask(index: number) {
    this.subtasks.splice(index, 1);
    this.taskForm.patchValue({ subtasks: this.subtasks });
  }


  createTask() {
    if (this.taskForm.valid) {
      this.firebaseService.createTask(this.taskForm.value);
      this.router.navigate(['board']);
    } else {
      alert('All fields (except subtasks) are required! Please fill them.');
    }
  }
}
