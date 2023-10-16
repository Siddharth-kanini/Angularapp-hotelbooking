import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../hotels.service';
import { hotels } from '../models/Hotel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
  export class HotelComponent implements OnInit {
    hotels: hotels[] = [];
  
    constructor(private hotelService: HotelsService, private router: Router) { }
  
    ngOnInit() {
      this.getAllHotels();
    }
  
    getAllHotels() {
      this.hotelService.getHotels().subscribe(
        data => {
          this.hotels = data;
        },
        error => {
          console.log('Error retrieving hotels:', error);
        }
      );
    }
  
    viewRooms(hotelId: number) {
      this.router.navigate(['/room'], { queryParams: { hotelId: hotelId } });
    }
  }