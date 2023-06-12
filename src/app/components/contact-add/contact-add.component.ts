import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent {

  type: string = '';

  contactForm!: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.route.params.subscribe(params => {
      this.type = params['id'];
    });
  }


  createFormGroup() {
    this.contactForm = this.formBuilder.group({
      id: new FormControl('id'),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }
}
