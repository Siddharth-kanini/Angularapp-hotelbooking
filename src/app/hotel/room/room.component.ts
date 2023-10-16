import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/Hotel';
import { RoomsService } from 'src/app/room.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{
  hotelId!: number;
  rooms: Room[] = [];
  uniqueRoomTypes: { type: string, count: number }[] = [];

  constructor(private route: ActivatedRoute, private roomService: RoomsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.hotelId = params['hotelId'];
      this.getRoomsByHotel(this.hotelId);
    });
  }

  getRoomsByHotel(hotelId: number) {
    this.roomService.getRoomsByHotel(hotelId).subscribe(
      data => {
        this.rooms = data;
        this.calculateUniqueRoomTypes();
      },
      error => {
        console.log('Error retrieving rooms:', error);
      }
    );
  }

  calculateUniqueRoomTypes() {
    this.uniqueRoomTypes = [];
    const roomTypes: string[] = [];

    this.rooms.forEach(room => {
      if (!roomTypes.includes(room.roomType)) {
        roomTypes.push(room.roomType);
        const count = this.rooms.filter(r => r.roomType === room.roomType).length;
        this.uniqueRoomTypes.push({ type: room.roomType, count: count });
      }
    });
  }

  getRoomImage(roomType: string): string {
    switch (roomType) {
      case 'STANDARD':
        return 'assets/standard-room.jpg';
      case 'DELUXE':
        return 'assets/deluxe-room.jpg';
      case 'SUITE':
        return 'assets/suite-room.jpg';
      default:
        return 'assets/default-room.jpg'; 
    }
  }
  
}