import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../booking.service';
import { Booking } from '../models/Hotel';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  booking: Booking = {
    bookingId: 0,
    customerId: 0,
    roomId: 0,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    status: 'Booked'
  };
  bookings: Booking[] = [];
  isUpdateModalOpen: boolean = false;
  selectedBooking: Booking = {
    bookingId: 0,
    customerId: 0,
    roomId: 0,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    status: 'Booked'}

  constructor(
    private customerService: CustomerService,
    private bookingService: BookingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const customerId = sessionStorage.getItem('customerId');
    const firstName = sessionStorage.getItem('firstName');

    if (customerId) {
      this.booking.customerId = parseInt(customerId, 10);
    } else {
      console.error('customerId not found in session storage');
    }

    if (firstName) {
      this.loadBookingsByFirstName(firstName);
    } else {
      console.error('firstName not found in session storage');
    }
  }

  submitBooking() {
    this.customerService.postBooking(this.booking).subscribe(
      (booking) => {
        this.toastr.success('Room booked', 'Booking Successful');
        console.log('Booking created:', booking);
        const firstName = sessionStorage.getItem('firstName');
        if (firstName) {
          this.loadBookingsByFirstName(firstName);
        }
      },
      (error) => {
        this.toastr.error('Selected room was already booked', 'Booking Error');
        console.log('Error:', error);
      }
    );
  }

  loadBookingsByFirstName(firstName: string) {
    this.bookingService.getBookingsByFirstName(firstName).subscribe(
      (bookings) => {
        this.bookings = bookings;
        console.log('Bookings retrieved:', this.bookings);
      },
      (error) => {
        console.log('Error retrieving bookings:', error);
      }
    );
  }

showUpdateForm: boolean = false;

updateBookingForm(booking: Booking) {
  this.booking = { ...booking }; 
  this.showUpdateForm = true;
}

// updateBooking() {
//   this.bookingService.updateBooking(this.booking).subscribe(
//     () => {
//       this.toastr.success('Booking updated successfully');
//       console.log('Booking updated:', this.booking);
//       const firstName = sessionStorage.getItem('firstName');
//       if (firstName) {
//         this.loadBookingsByFirstName(firstName);
//       }
//       this.showUpdateForm = false; 
//     },
//     (error) => {
//       this.toastr.error('Failed to update booking');
//       console.log('Error updating booking:', error);
//     }
//   );
// }

  deleteBooking(bookingId: number | undefined) {
    if (bookingId !== undefined) {
      this.bookingService.deleteBooking(bookingId).subscribe(
        () => {
          this.toastr.success('Booking deleted successfully');
          console.log('Booking deleted:', bookingId);
          const firstName = sessionStorage.getItem('firstName');
          if (firstName) {
            this.loadBookingsByFirstName(firstName);
          }
        },
        (error) => {
          this.toastr.error('Failed to delete booking');
          console.log('Error deleting booking:', error);
        }
      );
    } else {
      console.error('Booking ID is undefined');
    }
  }
  openUpdateModal(booking: Booking) {
    this.isUpdateModalOpen = true;
    this.selectedBooking = { ...booking }; 
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
  }

  submitUpdate() {
    this.bookingService.updateBooking(this.selectedBooking).subscribe(
      () => {
        this.toastr.success('Booking updated successfully');
        console.log('Booking updated:', this.selectedBooking);
        const firstName = sessionStorage.getItem('firstName');
        if (firstName) {
          this.loadBookingsByFirstName(firstName);
        }
        this.closeUpdateModal(); 
      },
      (error) => {
        this.toastr.error('Failed to update booking');
        console.log('Error updating booking:', error);
      }
    );
  }
  
}
