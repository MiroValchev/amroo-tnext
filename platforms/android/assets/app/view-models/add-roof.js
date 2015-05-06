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
var roof = require("../models/roof");
var camera = require("camera");
var uiEnums = require("ui/enums");
var AddRoofViewModel = (function (_super) {
    __extends(AddRoofViewModel, _super);
    function AddRoofViewModel() {
        _super.call(this);
        // Initialize default values.
        this.isBusy = false;
        this._activePanelId = "title";
    }
    Object.defineProperty(AddRoofViewModel.prototype, "el", {
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
    Object.defineProperty(AddRoofViewModel.prototype, "roof", {
        get: function () {
            if (!this._roof) {
                this.roof = new roof.Roof();
            }
            return this._roof;
        },
        set: function (value) {
            this._roof = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddRoofViewModel.prototype, "activePanelId", {
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
    Object.defineProperty(AddRoofViewModel.prototype, "roofTypes", {
        get: function () {
            if (!this._roofTypes) {
                //var types = enums.RoofType;            
                this._roofTypes = new Array();
                this._roofTypes.push(new baseTypes.KeyValuePair(2 /* Apartment */, "Apartment"));
                this._roofTypes.push(new baseTypes.KeyValuePair(1 /* House */, "House"));
                this._roofTypes.push(new baseTypes.KeyValuePair(3 /* Hotel */, "Hotel"));
            }
            return this._roofTypes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddRoofViewModel.prototype, "roofPetsTypes", {
        get: function () {
            if (!this._roofPetsTypes) {
                this._roofPetsTypes = new Array();
                this._roofPetsTypes.push(new baseTypes.KeyValuePair(0 /* All */, "All"));
                this._roofPetsTypes.push(new baseTypes.KeyValuePair(2 /* Cats */, "Cats"));
                this._roofPetsTypes.push(new baseTypes.KeyValuePair(1 /* Dogs */, "Dogs"));
            }
            return this._roofPetsTypes;
        },
        enumerable: true,
        configurable: true
    });
    AddRoofViewModel.prototype.selectType = function (args) {
        this.roof.Type = this.roofTypes[args.index].key;
        this.activePanelId = "petsType";
    };
    AddRoofViewModel.prototype.selectPetsType = function (args) {
        this.roof.PetType = this.roofPetsTypes[args.index].key;
        this.activePanelId = "location";
    };
    AddRoofViewModel.prototype.next = function (args) {
        var btn = args.object;
        this.activePanelId = btn.id;
    };
    AddRoofViewModel.prototype.save = function (args) {
        //if (!this.roof.DisplayName) {
        //    alert("Please enter your name.");
        //    return;
        //}        
        this.set("isBusy", true);
        if (!this.photo) {
            this._saveRoof();
        }
        else {
            var that = this;
            var imgBase64 = that.photo.toBase64String(uiEnums.ImageFormat.jpeg, 100);
            var file = {
                "Filename": this.roof.Id + ".jpeg",
                "ContentType": "image/jpeg",
                "base64": imgBase64
            };
            that.el.Files.create(file).then(function (data) {
                console.log("New picture uploaded - " + data.result.Uri);
                that.roof.Picture = data.result.Uri;
                that._saveRoof();
            }, function (error) {
                that.set("isBusy", false);
                alert("Error uploading image [" + error.message + "]");
            });
        }
    };
    AddRoofViewModel.prototype._saveRoof = function () {
        console.log("Creating roof");
        var that = this;
        var data = that.el.data("Roofs");
        data.create(that.roof, function (data) {
            console.log("Created roof");
            that.set("isBusy", false);
            dialogs.alert({
                title: "Done!",
                message: "We have added your roof!",
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
    AddRoofViewModel.prototype.takePicture = function (args) {
        var that = this;
        camera.takePicture().then(function (result) {
            that.set("photo", result);
        });
    };
    AddRoofViewModel.prototype.cancel = function (args) {
        frameModule.topmost().goBack();
    };
    return AddRoofViewModel;
})(observable.Observable);
exports.AddRoofViewModel = AddRoofViewModel;
//# sourceMappingURL=add-roof.js.map