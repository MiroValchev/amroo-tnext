import observable = require("data/observable");
import dialogs = require("ui/dialogs");
import frame = require("ui/frame");
import localSettings = require("local-settings");
var everlive = require("../lib/everlive");

export class LoginViewModel extends observable.Observable {
    private _el: any;//everlive;

    public username: string;
    public password: string;
    public isBusy: boolean;

    constructor() {
        super();
        // Initialize default values.

        //this.username = "W";
        //this.password = "w";
    }

    get el(): any {
        if (!this._el) {
            this.el = new everlive({ apiKey: global.TELERIK_BAAS_KEY });
        }

        return this._el;
    }

    set el(value: any) {
        this._el = value;
    }

    public login(args: observable.EventData) {
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
        that.el.Users.login(this.username, this.password,
            function (data) {
                that.set("isBusy", false);                
                localSettings.setString(global.TOKEN_DATA_KEY, data.result.access_token);
                localSettings.setString(global.USER_ID, data.result.principal_id);
                frame.topmost().navigate(global.HOME_SCREEN);
            },
            function (error) {
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
    }

    public register(args: observable.EventData) {
        frame.topmost().navigate("/views/register");
    }    
}

export var vm = new LoginViewModel();