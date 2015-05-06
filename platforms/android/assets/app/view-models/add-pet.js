var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var localSettings = require("local-settings");
var everlive = require("../lib/everlive");
var baseTypes = require("../models/base-types");
var enums = require("../models/enums");
var pet = require("../models/pet");
var camera = require("camera");
var uiEnums = require("ui/enums");
var AddPetViewModel = (function (_super) {
    __extends(AddPetViewModel, _super);
    function AddPetViewModel() {
        _super.call(this);
        // Initialize default values.
        this.isBusy = false;
        this._activePanelId = "title";
    }
    Object.defineProperty(AddPetViewModel.prototype, "el", {
        get: function () {
            if (!this._el) {
                this._el = new everlive({
                    apiKey: global.TELERIK_BAAS_KEY,
                    token: localSettings.getString(global.TOKEN_DATA_KEY)
                });
            }
            return this._el;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddPetViewModel.prototype, "pet", {
        get: function () {
            if (!this._pet) {
                this.pet = new pet.Pet();
            }
            return this._pet;
        },
        set: function (value) {
            this._pet = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddPetViewModel.prototype, "activePanelId", {
        get: function () {
            return this._activePanelId;
        },
        set: function (value) {
            this._activePanelId = value;
            this.notify({ object: this, eventName: observable.knownEvents.propertyChange, propertyName: "activePanelId", value: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddPetViewModel.prototype, "petTypes", {
        get: function () {
            if (!this._petTypes) {
                this._petTypes = new Array();
                this._petTypes.push(new baseTypes.KeyValuePair(enums.PetType.None, "n/a"));
                this._petTypes.push(new baseTypes.KeyValuePair(enums.PetType.Cat, "meow"));
                this._petTypes.push(new baseTypes.KeyValuePair(enums.PetType.Dog, "woof"));
            }
            return this._petTypes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddPetViewModel.prototype, "petGenders", {
        get: function () {
            if (!this._petGenders) {
                this._petGenders = new Array();
                this._petGenders.push(new baseTypes.KeyValuePair(enums.Gender.None, "None of your business"));
                this._petGenders.push(new baseTypes.KeyValuePair(enums.Gender.Male, "Male"));
                this._petGenders.push(new baseTypes.KeyValuePair(enums.Gender.Female, "Female"));
            }
            return this._petGenders;
        },
        enumerable: true,
        configurable: true
    });
    AddPetViewModel.prototype.selectType = function (args) {
        this.pet.Type = this.petTypes[args.index].key;
        this.activePanelId = "gender";
    };
    AddPetViewModel.prototype.selectGender = function (args) {
        this.pet.Gender = this.petGenders[args.index].key;
        this.activePanelId = "breed";
    };
    AddPetViewModel.prototype.next = function (args) {
        var btn = args.object;
        this.activePanelId = btn.id;
    };
    AddPetViewModel.prototype.save = function (args) {
        //if (!this.pet.DisplayName) {
        //    alert("Please enter your name.");
        //    return;
        //}        
        this.set("isBusy", true);
        if (!this.photo) {
            this._savePet();
        }
        else {
            var that = this;
            var imgBase64 = that.photo.toBase64String(uiEnums.ImageFormat.jpeg, 100);
            var file = {
                "Filename": "pets/" + this.pet.Id + ".jpeg",
                "ContentType": "image/jpeg",
                "base64": imgBase64
            };
            that.el.Files.create(file).then(function (data) {
                console.log("New picture uploaded - " + data.result.Uri);
                that.pet.Picture = data.result.Uri;
                that._savePet();
            }, function (error) {
                that.set("isBusy", false);
                alert("Error uploading image [" + error.message + "]");
            });
        }
    };
    AddPetViewModel.prototype._savePet = function () {
        console.log("Creating pet");
        var that = this;
        var data = that.el.data("Pets");
        data.create(that.pet, function (data) {
            console.log("Created pet");
            that.set("isBusy", false);
            dialogs.alert({
                title: "Done!",
                message: "We have added your pet!",
                okButtonText: "Great"
            });
            frameModule.topmost().goBack();
        }, function (error) {
            that.set("isBusy", false);
            dialogs.alert({
                title: "Ooops!",
                message: error.message,
                okButtonText: "Ok"
            });
        });
    };
    AddPetViewModel.prototype.takePicture = function (args) {
        var that = this;
        camera.takePicture().then(function (result) {
            that.set("photo", result);
        });
    };
    AddPetViewModel.prototype.cancel = function (args) {
        frameModule.topmost().goBack();
    };
    return AddPetViewModel;
})(observable.Observable);
exports.AddPetViewModel = AddPetViewModel;
//# sourceMappingURL=add-pet.js.map