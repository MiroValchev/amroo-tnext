export class GeoLocation {
    /**
     * The latitude of the geolocation, in degrees.
     */
    latitude: number;

    /**
     * The longitude of the geolocation, in degrees.
     */
    longitude: number;

    constructor(lat: number, long: number) {
        this.latitude = lat;
        this.longitude = long;
    }
}

export class KeyValuePair<T1, T2> {
    key: T1;
    value: T2;

    constructor(key: T1, value: T2) {
        this.key = key;
        this.value = value;
    }
}