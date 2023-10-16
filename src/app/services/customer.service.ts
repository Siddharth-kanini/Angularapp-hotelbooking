import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../models/customer';
import { Booking } from '../models/Hotel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://localhost:7194/api/Customers';


  postCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>('https://localhost:7194/api/Customers', customer)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCustomer(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(`https://localhost:7194/api/Customers/${customerId}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getCustomerByFirstName(firstName: string) {
    const url = `${this.baseUrl}/firstname/${firstName}`;
    return this.http.get(url);
  }
  updateCustomer(customer: Customer): Observable<Customer> {
    const url = `${this.baseUrl}/${customer.customerId}`;
    return this.http.put<Customer>(url, customer);
  }

  deleteCustomer(customerId: number): Observable<void> {
    const url = `${this.baseUrl}/${customerId}`;
    return this.http.delete<void>(url);
  }

  

  postBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>('https://localhost:7194/api/Bookings', booking)
      .pipe(
        catchError(this.handleError1)
      );
  }

  private handleError1(error: HttpErrorResponse) {
    if (error.status === 409) {
      return throwError('Conflict: Booking already exists');
    }
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('An error occurred. Please try again later.');
  }

 


  private handleError(error: HttpErrorResponse) {
    if (error.status === 409) {
      return throwError('Conflict: Customer already exists');
    }
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('An error occurred. Please try again later.');
  }
}
