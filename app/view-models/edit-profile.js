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
var camera = require("camera");
var uiEnums = require("ui/enums");
var EditProfileViewModel = (function (_super) {
    __extends(EditProfileViewModel, _super);
    function EditProfileViewModel() {
        _super.call(this);
        // Initialize default values.                
    }
    Object.defineProperty(EditProfileViewModel.prototype, "el", {
        get: function () {
            if (!this._el) {
                this.el = new everlive({
                    apiKey: global.TELERIK_BAAS_KEY,
                    token: localSettings.getString(global.TOKEN_DATA_KEY)
                });
            }
            return this._el;
        },
        set: function (value) {
            this._el = value;
        },
        enumerable: true,
        configurable: true
    });
    EditProfileViewModel.prototype.setUser = function (user) {
        this.set("user", user);
        console.log(this.user.DisplayName);
    };
    EditProfileViewModel.prototype.save = function (args) {
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
        }
        else {
            var that = this;
            var imgBase64 = that.photo.toBase64String(uiEnums.ImageFormat.jpeg, 100);
            var file = {
                "Filename": this.user.Username + ".jpeg",
                "ContentType": "image/jpeg",
                "base64": imgBase64
            };
            that.el.Files.create(file).then(function (data) {
                console.log("New picture uploaded - " + data.result.Uri);
                that.user.PictureUrl = data.result.Uri;
                that._initSaveUser();
            }, function (error) {
                that.set("isBusy", false);
                alert("Error uploading image [" + error.message + "]");
            });
        }
    };
    /**
        Checks if password has changed.
        Then initializes the real user update.
    */
    EditProfileViewModel.prototype._initSaveUser = function () {
        var that = this;
        if (that.newPassword) {
            that.el.Users.changePassword(that.user.Username, that.password, that.newPassword, true).then(function (data) {
                that._saveUser();
            }, function (error) {
                that.set("isBusy", false);
                alert("Error changing password [" + error.message + "]");
            });
        }
        else {
            that._saveUser();
        }
    };
    EditProfileViewModel.prototype._saveUser = function () {
        var that = this;
        that.el.Users.updateSingle(that.user, function (data) {
            that.set("isBusy", false);
            dialogs.alert({
                title: "Done!",
                message: "Your profile has been updated.",
                okButtonText: "Thanks"
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
    EditProfileViewModel.prototype.takePicture = function (args) {
        var that = this;
        camera.takePicture().then(function (result) {
            //vm.set("photo", result);
            that.set("photo", result);
        });
    };
    EditProfileViewModel.prototype.openAlbums = function (args) {
        alert("Coming really soon :)");
    };
    EditProfileViewModel.prototype.cancel = function (args) {
        frameModule.topmost().goBack();
    };
    return EditProfileViewModel;
})(observable.Observable);
exports.EditProfileViewModel = EditProfileViewModel;
exports.vm = new EditProfileViewModel();
//# sourceMappingURL=edit-profile.js.map