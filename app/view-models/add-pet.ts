import observable = require("data/observable");
import dialogs = require("ui/dialogs");
import frameModule = require("ui/frame");
import localSettings = require("local-settings");
var everlive = require("../lib/everlive");
import baseTypes = require("../models/base-types");
import enums = require("../models/enums");
import pet = require("../models/pet");
import button = require("ui/button");
import listView = require("ui/list-view");
import camera = require("camera");
import imageSource = require("image-source");
import uiEnums = require("ui/enums");


export class AddPetViewModel extends observable.Observable {
    private _el;
    private _pet: pet.Pet;
    private _activePanelId: string;
    private _petTypes: Array<baseTypes.KeyValuePair<enums.PetType, string>>;
    private _petGenders: Array<baseTypes.KeyValuePair<enums.Gender, string>>;

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

    get pet(): pet.Pet {
        if (!this._pet) {
            this.pet = new pet.Pet();
        }

        return this._pet;
    }

    set pet(value: pet.Pet) {
        this._pet = value;
    }

    get activePanelId(): string {
        return this._activePanelId;
    }

    set activePanelId(value: string) {
        this._activePanelId = value;
        this.notify({ object: this, eventName: observable.knownEvents.propertyChange, propertyName: "activePanelId", value: value });
    }

    get petTypes(): Array<baseTypes.KeyValuePair<enums.PetType, string>> {
        if (!this._petTypes) {
            this._petTypes = new Array<baseTypes.KeyValuePair<enums.PetType, string>>();
            this._petTypes.push(new baseTypes.KeyValuePair<enums.PetType, string>
                (enums.PetType.None, "n/a"));
            this._petTypes.push(new baseTypes.KeyValuePair<enums.PetType, string>
                (enums.PetType.Cat, "meow"));
            this._petTypes.push(new baseTypes.KeyValuePair<enums.PetType, string>
                (enums.PetType.Dog, "woof"));
        }

        return this._petTypes;
    }

    get petGenders(): Array<baseTypes.KeyValuePair<enums.Gender, string>> {
        if (!this._petGenders) {
            this._petGenders = new Array<baseTypes.KeyValuePair<enums.Gender, string>>();
            this._petGenders.push(new baseTypes.KeyValuePair<enums.Gender, string>
                (enums.Gender.None, "None of your business"));
            this._petGenders.push(new baseTypes.KeyValuePair<enums.Gender, string>
                (enums.Gender.Male, "Male"));
            this._petGenders.push(new baseTypes.KeyValuePair<enums.Gender, string>
                (enums.Gender.Female, "Female"));
        }

        return this._petGenders;
    }

    public selectType(args: listView.ItemEventData) {
        this.pet.Type = this.petTypes[args.index].key;
        this.activePanelId = "gender";
    }

    public selectGender(args: listView.ItemEventData) {
        this.pet.Gender = this.petGenders[args.index].key;
        this.activePanelId = "breed";
    }

    public next(args: observable.EventData) {
        var btn: button.Button = <button.Button>args.object;
        this.activePanelId = btn.id;
    }

    public save(args: observable.EventData) {
        //if (!this.pet.DisplayName) {
        //    alert("Please enter your name.");
        //    return;
        //}        
        
        this.set("isBusy", true);

        if (!this.photo) {
            this._savePet();
        } else {
            var that = this;
            var imgBase64: string = that.photo.toBase64String(uiEnums.ImageFormat.jpeg, 100)

            var file = {
                "Filename": "pets/" + this.pet.Id + ".jpeg",
                "ContentType": "image/jpeg",
                "base64": imgBase64
            };

            that.el.Files.create(file).then(
                function (data) {
                    console.log("New picture uploaded - " + data.result.Uri);
                    that.pet.Picture = data.result.Uri;
                    that._savePet();
                },
                function (error) {
                    that.set("isBusy", false);
                    alert("Error uploading image [" + error.message + "]")
                });
        }
    }

    private _savePet() {
        console.log("Creating pet");

        var that = this;
        var data = that.el.data("Pets");

        data.create(that.pet,
            function (data) {
                console.log("Created pet");
                that.set("isBusy", false);

                dialogs.alert({
                    title: "Done!",
                    message: "We have added your pet!",
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