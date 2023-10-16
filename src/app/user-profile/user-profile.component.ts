import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { customerDetails } from '../models/customerDetails';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  firstName!: string | null;
  customerDetails: customerDetails | null = null;
  isEditingProfilePic: boolean = false;
  selectedProfilePic: File | null = null;

  constructor(private customerService: CustomerService,private router:Router) {}

  ngOnInit() {
    this.firstName = sessionStorage.getItem('firstName'); 

    if (this.firstName) {
      this.customerService.getCustomerByFirstName(this.firstName).subscribe(
        (customer: any) => {
          this.customerDetails = customer;
          console.log('Customer Details:', this.customerDetails);
          if (this.customerDetails?.customerId) {
            sessionStorage.setItem('customerId', this.customerDetails.customerId.toString());
          }
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }

  logout() {
    sessionStorage.removeItem('firstName'); 
    this.firstName = null;
    this.customerDetails = null;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
  
 
}
