import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RoomComponent } from './hotel/room/room.component';
// import { SearchComponent } from './search/search.component';
// import { HotelListComponent } from './hotel-list/hotel-list.component';
// import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { BookingComponent } from './booking/booking.component';
// import { ReservationConfirmationComponent } from './reservation-confirmation/reservation-confirmation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HotelComponent } from './hotel/hotel.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'hotel',component:HotelComponent},
  {path: 'room', component:RoomComponent},
  // { path: 'search', component: SearchComponent },
  // { path: 'hotels', component: HotelListComponent },
  // { path: 'hotels/:id', component: HotelDetailsComponent },
  { path: 'booking', component: BookingComponent },
  // { path: 'reservation', component: ReservationConfirmationComponent },
  {path: 'profile', component: UserProfileComponent },
  { path: 'pandora-hotels-admin/login', component: AdminLoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  {path: 'pandora-hotels-admin/dashboard', component:AdminDashboardComponent},
  { path: '**', redirectTo: '/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

