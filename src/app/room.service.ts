import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from './models/Hotel';
@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl = 'https://localhost:7194/api/Rooms';
  constructor(private http: HttpClient) { }
  getRoomsByHotel(hotelId: number): Observable<Room[]> {
    const url = `${this.apiUrl}/AvailableRoomsByHotel/${hotelId}`;
    return this.http.get<Room[]>(url);
  }
}
