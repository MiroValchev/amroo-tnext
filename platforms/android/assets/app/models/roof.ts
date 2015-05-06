import base = require("../models/base-entity");
import enums = require("../models/enums");
var everlive = require("../lib/everlive");

export class Roof extends base.BaseEntity {
    Location: any;//everlive.GeoPoint;
    Address: string;
    City: string;
    Type: enums.RoofType;
    PetType: enums.RoofPetsType;
    Title: string;
    Description: string;
    IsAvailable: boolean;
    Picture: string;
    Price: number;

    constructor() {
        super();
        // Initialize default values.

        this.IsAvailable = true;
    }    
}