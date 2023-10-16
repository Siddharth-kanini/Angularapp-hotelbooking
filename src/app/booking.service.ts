import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Booking } from './models/Hotel';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'https://localhost:7194/api/Bookings';

  constructor(private http: HttpClient) { }

  getBookingsByFirstName(firstName: string): Observable<Booking[]> {
    const token = localStorage.getItem('jwtToken');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.get<Booking[]>(`${this.baseUrl}/ByFirstName/${firstName}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  updateBooking(booking: Booking): Observable<Booking> {
    const token = localStorage.getItem('jwtToken');
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  
    return this.http.put<Booking>(`${this.baseUrl}/${booking.bookingId}`, booking, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  deleteBooking(bookingId: number): Observable<void> {
    const token = localStorage.getItem('jwtToken');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.delete<void>(`${this.baseUrl}/${bookingId}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

 

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
