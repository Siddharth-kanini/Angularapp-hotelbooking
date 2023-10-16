import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room, hotels } from './models/Hotel';
import {  HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(private http: HttpClient) { }
  getHotels(): Observable<hotels[]> {
    return this.http.get<hotels[]>('https://localhost:7194/api/Hotels');
  }
  getRoom(): Observable<Room[]> {
    return this.http.get<Room[]>('https://localhost:7194/api/Rooms');
  }


}
