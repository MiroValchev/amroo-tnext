var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var everlive = require("../lib/everlive");
var RegisterViewModel = (function (_super) {
    __extends(RegisterViewModel, _super);
    function RegisterViewModel() {
        _super.call(this);
        this.isBusy = false;
        // Initialize default values.        
        this.email = "";
        this.username = "";
        this.password = "";
        this.passwordRepeat = "";
    }
    RegisterViewModel.prototype.save = function (args) {
        if (!this.name) {
            alert("Please enter your name.");
            return;
        }
        if (this.email == "") {
            alert("Please enter your email.");
            return;
        }
        if (this.username == "") {
            alert("Please enter username.");
            return;
        }
        if (this.password == "") {
            alert("Please enter password.");
            return;
        }
        if (this.passwordRepeat != this.password) {
            alert("Passwords don't match.");
            return;
        }
        this.set("isBusy", true);
        var el = new everlive({
            apiKey: global.TELERIK_BAAS_KEY
        });
        var attrs = {
            Email: this.email,
            DisplayName: this.name
        };
        el.Users.register(this.username, this.password, attrs, function (data) {
            exports.vm.set("isBusy", false);
            dialogs.alert({
                title: "You are ready to go!",
                message: "You can now login with your credentials.",
                okButtonText: "Let's go"
            });
            frameModule.topmost().goBack();
        }, function (error) {
            this.set("isBusy", false);
            dialogs.alert({
                title: "Ooops!",
                message: error.message,
                okButtonText: "Close"
            });
        });
    };
    RegisterViewModel.prototype.cancel = function (args) {
        frameModule.topmost().goBack();
    };
    return RegisterViewModel;
})(observable.Observable);
exports.RegisterViewModel = RegisterViewModel;
exports.vm = new RegisterViewModel();
//# sourceMappingURL=register.js.map