import { Injectable } from '@angular/core';
import { Customer } from './models/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  private customer: Customer | null = null;

  setCustomer(customer: Customer) {
    this.customer = customer;
  }

  getCustomer(): Customer | null {
    return this.customer;
  }

  clearCustomer() {
    this.customer = null;
  }
}
