var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
var dialogs = require("ui/dialogs");
var frame = require("ui/frame");
var localSettings = require("local-settings");
var everlive = require("../lib/everlive");
var LoginViewModel = (function (_super) {
    __extends(LoginViewModel, _super);
    function LoginViewModel() {
        _super.call(this);
        // Initialize default values.
        //this.username = "W";
        //this.password = "w";
    }
    Object.defineProperty(LoginViewModel.prototype, "el", {
        get: function () {
            if (!this._el) {
                this.el = new everlive({ apiKey: global.TELERIK_BAAS_KEY });
            }
            return this._el;
        },
        set: function (value) {
            this._el = value;
        },
        enumerable: true,
        configurable: true
    });
    LoginViewModel.prototype.login = function (args) {
        if (!this.username) {
            dialogs.alert("Please enter username.");
            return;
        }
        if (!this.password) {
            dialogs.alert("Please enter password.");
            return;
        }
        /*
        * Everlive is the SDK of the BAAS we are using as part of the
        elerik Platform. (see more here: http://platform.telerik.com)
                
        * For more info on what this SDK offers - http://docs.telerik.com/platform/backend-services/what-are-telerik-backend-services
         *
         * You can use any other JavaScript or native SDKs with NativeScript.
         */
        this.set("isBusy", true);
        var that = this;
        that.el.Users.login(this.username, this.password, function (data) {
            that.set("isBusy", false);
            localSettings.setString(global.TOKEN_DATA_KEY, data.result.access_token);
            localSettings.setString(global.USER_ID, data.result.principal_id);
            frame.topmost().navigate(global.HOME_SCREEN);
        }, function (error) {
            that.set("isBusy", false);
            /*
             * Here you can see a more advanced usage of the dialogs.alert.
             * You can specify the dialog header and the string used for the OK button.
             *
             * For more options you can check the docs - http://docs.nativescript.org/ui-dialogs
             */
            dialogs.alert({
                title: "Ooops!",
                message: error.message,
                okButtonText: "Close"
            });
        });
    };
    LoginViewModel.prototype.register = function (args) {
        frame.topmost().navigate("/views/register");
    };
    return LoginViewModel;
})(observable.Observable);
exports.LoginViewModel = LoginViewModel;
exports.vm = new LoginViewModel();
//# sourceMappingURL=login.js.map