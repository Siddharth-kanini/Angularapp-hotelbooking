import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      //customerId: [null, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactInfo: ['', Validators.required],
      password: ['', Validators.required],
      //roleId: [null, Validators.required]
    });

    if (this.signupForm) {
      this.signupForm.valueChanges.subscribe(() => {
        this.onFormValueChanged();
      });
    }
  }

  insertCustomer() {
    if (this.signupForm.invalid) {
      return;
    }
  
    const newCustomer: Customer = {
      customerId: this.signupForm.value.customerId,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      contactInfo: this.signupForm.value.contactInfo,
      password: this.signupForm.value.password,
      roleId: this.signupForm.value.roleId
    };
  
    this.customerService.postCustomer(newCustomer)
      .subscribe(
        customer => {
          console.log('Inserted:', customer);
          
          this.signupForm.reset();
          
          // Save the first name in session storage
          sessionStorage.setItem('firstName', customer.firstName);
          
          alert('Registered successfully!');
    
          this.router.navigate(['/profile']);
        },
        error => {
          console.log('Error:', error);
        }
      );
  }
  

  
  isFieldValid(field: string) {
    return (
      !this.signupForm.get(field)?.valid &&
      this.signupForm.get(field)?.touched
    );
  }

  
  getErrorMessage(field: string) {
    if (this.signupForm.get(field)?.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  onFormValueChanged() {
    for (const field in this.signupForm.controls) {
      if (this.signupForm.controls.hasOwnProperty(field)) {
        this.signupForm.controls[field].markAsTouched();
      }
    }
  }
}
