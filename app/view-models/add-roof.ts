import observable = require("data/observable");
import dialogs = require("ui/dialogs");
import frameModule = require("ui/frame");
import localSettings = require("local-settings");
var everlive = require("../lib/everlive");
import baseTypes = require("../models/base-types");
import enums = require("../models/enums");
import roof = require("../models/roof");
import button = require("ui/button");
import listView = require("ui/list-view");
import camera = require("camera");
import imageSource = require("image-source");
import uiEnums = require("ui/enums");


export class AddRoofViewModel extends observable.Observable {
    private _el: any;//everlive;
    private _roof: roof.Roof;
    private _activePanelId: string;
    private _roofTypes: Array<baseTypes.KeyValuePair<enums.RoofType, string>>;
    private _roofPetsTypes: Array<baseTypes.KeyValuePair<enums.RoofPetsType, string>>;

    public isBusy: boolean;
    public photo: imageSource.ImageSource;

    constructor() {
        super();

        // Initialize default values.
        this.isBusy = false;
        this._activePanelId = "title";
    }

    get el(): any {
        if (!this._el) {
            this._el = new everlive({
                apiKey: global.TELERIK_BAAS_KEY,
                token: localSettings.getString(global.TOKEN_DATA_KEY)
            });
        }

        return this._el;
    }

    get roof(): roof.Roof {
        if (!this._roof) {
            this.roof = new roof.Roof();
        }

        return this._roof;
    }

    set roof(value: roof.Roof) {
        this._roof = value;
    }

    get activePanelId(): string {
        return this._activePanelId;
    }

    set activePanelId(value: string) {
        this._activePanelId = value;
        this.notify({ object: this, eventName: observable.knownEvents.propertyChange, propertyName: "activePanelId", value: value });
    }

    get roofTypes(): Array<baseTypes.KeyValuePair<enums.RoofType, string>> {
        if (!this._roofTypes) {
            //var types = enums.RoofType;            
            this._roofTypes = new Array<baseTypes.KeyValuePair<enums.RoofType, string>>();
            this._roofTypes.push(new baseTypes.KeyValuePair<enums.RoofType, string>
                (enums.RoofType.Apartment, "Apartment"));
            this._roofTypes.push(new baseTypes.KeyValuePair<enums.RoofType, string>
                (enums.RoofType.House, "House"));
            this._roofTypes.push(new baseTypes.KeyValuePair<enums.RoofType, string>
                (enums.RoofType.Hotel, "Hotel"));
        }

        return this._roofTypes;
    }

    get roofPetsTypes(): Array<baseTypes.KeyValuePair<enums.RoofPetsType, string>> {
        if (!this._roofPetsTypes) {
            this._roofPetsTypes = new Array<baseTypes.KeyValuePair<enums.RoofPetsType, string>>();
            this._roofPetsTypes.push(new baseTypes.KeyValuePair<enums.RoofPetsType, string>
                (enums.RoofPetsType.All, "All"));
            this._roofPetsTypes.push(new baseTypes.KeyValuePair<enums.RoofPetsType, string>
                (enums.RoofPetsType.Cats, "Cats"));
            this._roofPetsTypes.push(new baseTypes.KeyValuePair<enums.RoofPetsType, string>
                (enums.RoofPetsType.Dogs, "Dogs"));
        }

        return this._roofPetsTypes;
    }

    public selectType(args: listView.ItemEventData) {
        this.roof.Type = this.roofTypes[args.index].key;
        this.activePanelId = "petsType";
    }

    public selectPetsType(args: listView.ItemEventData) {
        this.roof.PetType = this.roofPetsTypes[args.index].key;
        this.activePanelId = "location";
    }

    public next(args: observable.EventData) {
        var btn: button.Button = <button.Button>args.object;
        this.activePanelId = btn.id;
    }

    public save(args: observable.EventData) {
        //if (!this.roof.DisplayName) {
        //    alert("Please enter your name.");
        //    return;
        //}        
        
        this.set("isBusy", true);

        if (!this.photo) {
            this._saveRoof();
        } else {
            var that = this;
            var imgBase64: string = that.photo.toBase64String(uiEnums.ImageFormat.jpeg, 100)

            var file = {
                "Filename": this.roof.Id + ".jpeg",
                "ContentType": "image/jpeg",
                "base64": imgBase64
            };

            that.el.Files.create(file).then(
                function (data) {
                    console.log("New picture uploaded - " + data.result.Uri);
                    that.roof.Picture = data.result.Uri;
                    that._saveRoof();
                },
                function (error) {
                    that.set("isBusy", false);
                    alert("Error uploading image [" + error.message + "]")
                });
        }
    }

    private _saveRoof() {
        console.log("Creating roof");

        var that = this;
        var data = that.el.data("Roofs");

        data.create(that.roof,
            function (data) {
                console.log("Created roof");
                that.set("isBusy", false);

                dialogs.alert({
                    title: "Done!",
                    message: "We have added your roof!",
                    okButtonText: "Great"
                });

                frameModule.topmost().goBack();
            },
            function (error) {
                that.set("isBusy", false);

                dialogs.alert({
                    title: "Ooops!",
                    message: error.message,
                    okButtonText: "Ok"
                });
            });
    }

    public takePicture(args: observable.EventData) {
        var that = this;

        camera.takePicture().then(function (result) {
            that.set("photo", result);
        });
    }

    public cancel(args: observable.EventData) {
        frameModule.topmost().goBack();
    }
}