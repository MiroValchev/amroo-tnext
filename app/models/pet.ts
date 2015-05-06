import base = require("../models/base-entity");
import enums = require("../models/enums");

export class Pet extends base.BaseEntity {
    Name: string;
    Type: enums.PetType;
    Breed: string;
    Gender: enums.Gender;
    Age: number;
    Picture: string;
    Description: string;

    constructor() {
        super();
        // Initialize default values.
    }
}    