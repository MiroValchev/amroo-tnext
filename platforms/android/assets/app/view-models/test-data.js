var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
var everlive = require("../lib/everlive");
var roofModel = require("../models/roof");
var petModel = require("../models/pet");
var localSettings = require("local-settings");
var types = require("../models/base-types");
var TestManager = (function (_super) {
    __extends(TestManager, _super);
    function TestManager() {
        _super.call(this);
        // Initialize default values.   
        this.el = new everlive({
            apiKey: global.TELERIK_BAAS_KEY,
            token: localSettings.getString(global.TOKEN_DATA_KEY)
        });
    }
    TestManager.prototype.populateBackend = function () {
        this.createRoofs();
        this.createPets();
    };
    TestManager.prototype.createRoofs = function () {
        var roofs = [];
        for (var i = 1; i <= 25; i++) {
            var roof = new roofModel.Roof();
            var cities = ["Boston", "Chicago", "Seattle", "NY", "Los Angeles"];
            var addresses = ["Native Script 2015", "Type Script 128", "Amroo 345", "221B Backer Str.", "15010 NE 36th Street"];
            var titles = ["Heaven is a place on earth", "Pet Resort Deluxe", "As cosy as it gets", "Amuzement park for your pet"];
            var pictures = ["https://bs1.cdn.telerik.com/v1/mAwPauQ0TuOhQuvZ/107ea3d1-eda1-11e4-a88a-6dcde0f87a77", "https://bs3.cdn.telerik.com/v1/mAwPauQ0TuOhQuvZ/107e55b3-eda1-11e4-a88a-6dcde0f87a77", "https://bs1.cdn.telerik.com/v1/mAwPauQ0TuOhQuvZ/107e55b0-eda1-11e4-a88a-6dcde0f87a77", "https://bs1.cdn.telerik.com/v1/mAwPauQ0TuOhQuvZ/107e55b1-eda1-11e4-a88a-6dcde0f87a77", "https://bs1.cdn.telerik.com/v1/mAwPauQ0TuOhQuvZ/107e2ea0-eda1-11e4-a88a-6dcde0f87a77"];
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
        this.el.data('Roofs').create(roofs, function (data) {
            console.log("Created roofs data - " + JSON.stringify(data));
        }, function (error) {
            console.log("Error creating roofs [" + error.message + "]");
        });
    };
    TestManager.prototype.createPets = function () {
        var pets = [];
        var i;
        for (i = 1; i <= 30; i++) {
            var pet = new petModel.Pet();
            var names = ["Pixel", "Sharo", "Snoopy", "Tom", "Jerry"];
            var breeds = ["Pug", "Street Deluxe", "Noble", "Pitbull", "Hairy beast"];
            var pictures = ["https://bs2.cdn.telerik.com/v1/mAwPauQ0TuOhQuvZ/107ea3d0-eda1-11e4-a88a-6dcde0f87a77", "https://bs1.cdn.telerik.com/v1/mAwPauQ0TuOhQuvZ/107ef1f0-eda1-11e4-a88a-6dcde0f87a77", "https://bs3.cdn.telerik.com/v1/mAwPauQ0TuOhQuvZ/107e2ea1-eda1-11e4-a88a-6dcde0f87a77", "https://bs2.cdn.telerik.com/v1/mAwPauQ0TuOhQuvZ/107e55b2-eda1-11e4-a88a-6dcde0f87a77"];
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
        this.el.data('Pets').create(pets, function (data) {
            console.log("Created pets data - " + JSON.stringify(data));
        }, function (error) {
            console.log("Error creating pets [" + error.message + "]");
        });
    };
    return TestManager;
})(observable.Observable);
exports.TestManager = TestManager;
//# sourceMappingURL=test-data.js.map