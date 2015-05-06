import base = require("../models/base-entity");
var everlive = require("../lib/everlive");
import pet = require("models/pet");
import roof = require("models/roof");

export class User extends base.BaseEntity {
    CityName: string;
    Username: string;
    DisplayName: string;
    Email: string;
    GeoLocation: any;//everlive.GeoPoint;
    IsVerified: boolean;
    Password: string;
    PasswordSalt: string;
    PhoneNumber: string;
    PictureUrl: string;
    AverageRating: number;
    RatingsNumber: number;
    Description: string;

    constructor() {
        super();
        // Initialize default values.
    }
}

export class UserExt extends User {
    Roofs: Array<roof.Roof>;
    Pets: Array<pet.Pet>;
}