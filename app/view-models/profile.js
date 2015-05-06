var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
var frame = require("ui/frame");
var localSettings = require("local-settings");
var everlive = require("../lib/everlive");
var ProfileViewModel = (function (_super) {
    __extends(ProfileViewModel, _super);
    function ProfileViewModel() {
        _super.call(this);
        // Initialize default values.        
        this.userId = localSettings.getString(global.USER_ID);
        this.selectedTab = 0;
    }
    Object.defineProperty(ProfileViewModel.prototype, "el", {
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
    Object.defineProperty(ProfileViewModel.prototype, "userId", {
        get: function () {
            return this._userId;
        },
        set: function (value) {
            if (this._userId !== value) {
                this._userId = value;
                var that = this;
                that.set("isBusy", true);
                var expandExp = {
                    "Roofs.CreatedBy": {
                        "ReturnAs": "Roofs",
                        "Take": 10 //limit the number of roof returned
                    },
                    "Pets.CreatedBy": {
                        "ReturnAs": "Pets",
                        "Take": 10
                    }
                };
                this.el.Users.expand(expandExp).getById(this._userId).then(function (data) {
                    console.log("Got user data");
                    that.set("user", data.result);
                    that.set("pets", data.result.Pets);
                    that.set("roofs", data.result.Roofs);
                    that.set("isBusy", false);
                }, function (error) {
                    that.set("isBusy", false);
                    alert(error.message);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    ProfileViewModel.prototype.showPet = function (args) {
        frame.topmost().navigate({
            moduleName: "/views/pet",
            context: this.user.Pets[args.index]
        });
    };
    ProfileViewModel.prototype.showRoof = function (args) {
        frame.topmost().navigate({
            moduleName: "/views/roof",
            context: this.user.Roofs[args.index]
        });
    };
    ProfileViewModel.prototype.editUser = function (args) {
        frame.topmost().navigate({
            moduleName: "/views/edit-profile",
            context: this.user
        });
    };
    ProfileViewModel.prototype.call = function (args) {
        //this.user.PhoneNumber;
    };
    ProfileViewModel.prototype.sendEmail = function (args) {
        //this.user.Email;
    };
    ProfileViewModel.prototype.cancel = function (args) {
        frame.topmost().goBack();
    };
    return ProfileViewModel;
})(observable.Observable);
exports.ProfileViewModel = ProfileViewModel;
exports.vm = new ProfileViewModel();
//# sourceMappingURL=profile.js.map