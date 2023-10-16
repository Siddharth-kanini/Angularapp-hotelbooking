export interface hotels{
    hotelId:number;
    name:string;
    location:string;
    contactInfo:string;
    Room:Room[];
}

export interface Room{
    roomId:number;
    hotelId:number;
    roomType:string;
    price:string;
    availability:string;
    Booking:Booking[]


}

export interface Booking{
    bookingId?:number;
    customerId:number;
    roomId:number;
    checkInDate:Date;
    checkOutDate:Date;
    status:string

}

