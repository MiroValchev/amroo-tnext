(function (RoofType) {
    RoofType[RoofType["House"] = 1] = "House";
    RoofType[RoofType["Apartment"] = 2] = "Apartment";
    RoofType[RoofType["Hotel"] = 3] = "Hotel";
})(exports.RoofType || (exports.RoofType = {}));
var RoofType = exports.RoofType;
;
(function (RoofPetsType) {
    RoofPetsType[RoofPetsType["All"] = 0] = "All";
    RoofPetsType[RoofPetsType["Dogs"] = 1] = "Dogs";
    RoofPetsType[RoofPetsType["Cats"] = 2] = "Cats";
})(exports.RoofPetsType || (exports.RoofPetsType = {}));
var RoofPetsType = exports.RoofPetsType;
;
(function (PetType) {
    PetType[PetType["None"] = 0] = "None";
    PetType[PetType["Dog"] = 1] = "Dog";
    PetType[PetType["Cat"] = 2] = "Cat";
})(exports.PetType || (exports.PetType = {}));
var PetType = exports.PetType;
;
(function (Gender) {
    Gender[Gender["None"] = 0] = "None";
    Gender[Gender["Male"] = 1] = "Male";
    Gender[Gender["Female"] = 2] = "Female";
})(exports.Gender || (exports.Gender = {}));
var Gender = exports.Gender;
;
//# sourceMappingURL=enums.js.map