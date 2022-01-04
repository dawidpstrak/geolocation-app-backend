import { GeolocationDocument } from 'src/schemas/Geolocation';

export interface IIndexGeolocations {
    geolocations: GeolocationDocument[];
    totalGeolocationsCount: number;
}
