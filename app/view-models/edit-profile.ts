import observable = require("data/observable");
import dialogs = require("ui/dialogs");
import frameModule = require("ui/frame");
import localSettings = require("local-settings");
var everlive = require("../lib/everlive");
import userModel = require("../models/user");
import camera = require("camera");
import imageSource = require("image-source");
import uiEnums = require("ui/enums");

export class EditProfileViewModel extends observable.Observable {
    private _el: any;//everlive;
    public user: userModel.User;
    public isBusy: boolean;
    public photo: imageSource.ImageSource;
    public password: string;
    public newPassword: string;
    public confirmPassword: string;

    constructor() {
        super();

        // Initialize default values.                
    }

    get el(): any {
        if (!this._el) {
            this.el = new everlive({
                apiKey: global.TELERIK_BAAS_KEY,
                token: localSettings.getString(global.TOKEN_DATA_KEY)
            });
        }

        return this._el;
    }

    set el(value: any) {
        this._el = value;
    }

    public setUser(user: userModel.User) {        
        this.set("user", user);
        console.log(this.user.DisplayName);
    }

    public save(args: observable.EventData) {
        if (!this.user.DisplayName) {
            alert("Please enter your name.");
            return;
        }

        if (!this.user.Email) {
            alert("Please enter your email.");
            return;
        }

        if (!this.user.Username) {
            alert("Please enter username.");
            return;
        }

        if (this.newPassword) {
            //todo some regex 

            if (!this.password) {
                alert("Enter your current password!");
                return;
            }

            if (this.newPassword !== this.confirmPassword) {
                alert("Password and confirm password should match!");
                return;
            }
        }

        this.set("isBusy", true);

        if (!this.photo) {
            this._initSaveUser();
        } else {
            var that = this;
            var imgBase64: string = that.photo.toBase64String(uiEnums.ImageFormat.jpeg, 100)

            var file = {
                "Filename": this.user.Username + ".jpeg",
                "ContentType": "image/jpeg",
                "base64": imgBase64
            };

            that.el.Files.create(file).then(
                function (data) {
                    console.log("New picture uploaded - " + data.result.Uri);
                    that.user.PictureUrl = data.result.Uri;
                    that._initSaveUser();
                },
                function (error) {
                    that.set("isBusy", false);
                    alert("Error uploading image [" + error.message + "]")
                });
        }
    }

    /**
        Checks if password has changed.
        Then initializes the real user update.
    */
    private _initSaveUser() {
        var that = this;

        if (that.newPassword) {
            that.el.Users.changePassword(that.user.Username, that.password, that.newPassword, true).then(
                function (data) {
                    that._saveUser();
                },
                function (error) {
                    that.set("isBusy", false);
                    alert("Error changing password [" + error.message + "]")
                });
        }
        else {
            that._saveUser();
        }
    }

    private _saveUser() {
        var that = this;

        that.el.Users.updateSingle(that.user,
            function (data) {
                that.set("isBusy", false);

                dialogs.alert({
                    title: "Done!",
                    message: "Your profile has been updated.",
                    okButtonText: "Thanks"
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
            //vm.set("photo", result);
            that.set("photo", result);
        });
    }

    public openAlbums(args: observable.EventData) {
        alert("Coming really soon :)");
    }

    public cancel(args: observable.EventData) {
        frameModule.topmost().goBack();
    }
}

export var vm = new EditProfileViewModel();