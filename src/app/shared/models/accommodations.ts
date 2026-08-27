export class AccommodationsModel {
    id_accommodation?: number;
    title_accommodation: string;
    price_accommodation: number;
    description_accommodation: string
    location_accommodation?: string;
    guests_accommodation?: number;
    beds_accommodation?: number;
    rooms_accommodation?: number;
    bathrooms_accommodation?: number;
    squareMeters_accommodation?: number;
    status_accommodation?: number;
    parking_accommodation?: boolean;
    url_accommodation?: string;
    amenities?: number[];

    constructor(){
        this.title_accommodation = '';
        this.price_accommodation = 0;
        this.description_accommodation = '';
        this.location_accommodation = '';
        this.guests_accommodation = 0;
        this.beds_accommodation = 0;
        this.rooms_accommodation = 0;
        this.bathrooms_accommodation = 0;
        this.squareMeters_accommodation = 0;
        this.status_accommodation = 0;
        this.parking_accommodation = false;
        this.url_accommodation = '';
        this.amenities = [];    
    }
}