import observable = require("data/observable");
var everlive = require("../lib/everlive");
import roofModel = require("../models/roof");
import petModel = require("../models/pet");
import localSettings = require("local-settings");
import enums = require("../models/enums");
import types = require("../models/base-types");

export class TestManager extends observable.Observable {
    private el: any;//everlive;

    constructor() {
        super();

        // Initialize default values.   
        this.el = new everlive({
            apiKey: global.TELERIK_BAAS_KEY,
            token: localSettings.getString(global.TOKEN_DATA_KEY)
        });
    }

    public populateBackend() {
        this.createRoofs();
        this.createPets();
    }

    private createRoofs() {
        var roofs: Array<roofModel.Roof> = [];

        for (var i:number = 1; i <= 25; i++) {
            var roof: roofModel.Roof = new roofModel.Roof();

            var cities = ["Boston", "Chicago", "Seattle", "NY", "Los Angeles"];
            var addresses = ["Native Script 2015", "Type Script 128", "Amroo 345", "221B Backer Str.", "15010 NE 36th Street"];
            var titles = ["Heaven is a place on earth", "Pet Resort Deluxe", "As cosy as it gets", "Amuzement park for your pet"];
            //PUT A LIST OF URLS TO PICTURES HERE
            var pictures = [];

            //NY 40.7052648,-73.9182262,12
            roof.Location = new types.GeoLocation(40.70 - Math.random(), -73.91 - Math.random());
            roof.Address = addresses[Math.floor(Math.random() * addresses.length)];
            roof.City = cities[Math.floor(Math.random() * cities.length)];
            roof.Type = Math.floor((Math.random() * 3) + 1);
            roof.PetType = Math.floor(Math.random() * 2);
            roof.Title = titles[Math.floor(Math.random() * titles.length)] + " - " + i;
            roof.Description = roof.Title + " / " + roof.City + " / " + roof.Address;
            roof.Picture = pictures[Math.floor(Math.random() * pictures.length)];
            roof.Price = Math.floor(Math.random() * 100);

            roofs.push(roof);
        }

        console.dir(roofs);        
        
        this.el.data('Roofs').create(roofs,
            function(data) {
                console.log("Created roofs data - " + JSON.stringify(data));
            },
            function(error) {
                console.log("Error creating roofs [" + error.message + "]");
            });
    }

    private createPets() {
        var pets: Array<petModel.Pet> = [];

        var i: number;
        for (i = 1; i <= 30; i++) {
            var pet: petModel.Pet = new petModel.Pet();

            var names = ["Pixel", "Sharo", "Snoopy", "Tom", "Jerry"];
            var breeds = ["Pug", "Street Deluxe", "Noble", "Pitbull", "Hairy beast"];
            //PUT A LIST OF URLS TO PICTURES HERE
            var pictures = [];

            pet.Name = names[Math.floor(Math.random() * names.length)] + " - " + i;
            pet.Type = Math.floor(Math.random() * 3);
            pet.Breed = breeds[Math.floor(Math.random() * breeds.length)];
            pet.Age = Math.floor(Math.random() * 10) + 1;
            pet.Description = pet.Name + " / " + pet.Age;
            pet.Gender = Math.floor(Math.random() * 3);
            pet.Picture = pictures[Math.floor(Math.random() * pictures.length)];

            pets.push(pet);
        }

        console.dir(pets);

        this.el.data('Pets').create(pets,
            function(data) {
                console.log("Created pets data - " + JSON.stringify(data));
            },
            function(error) {
                console.log("Error creating pets [" + error.message + "]");
            });
    }
}