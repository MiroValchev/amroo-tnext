import observable = require("data/observable");
import dialogs = require("ui/dialogs");
import frameModule = require("ui/frame");
import localSettings = require("local-settings");
var everlive = require("../lib/everlive");

export class RegisterViewModel extends observable.Observable {
    //in TS public is by default
    public name: string;
    public email: string;
    public username: string;
    public password: string;
    public passwordRepeat: string;
    public isBusy: boolean = false;

    constructor() {
        super();

        // Initialize default values.        
        this.email = "";
        this.username = "";
        this.password = "";
        this.passwordRepeat = "";
    }

    public save(args: observable.EventData) {        
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

        el.Users.register(this.username,
            this.password,
            attrs,
            function (data) {
                vm.set("isBusy", false);

                dialogs.alert({
                    title: "You are ready to go!",
                    message: "You can now login with your credentials.",
                    okButtonText: "Let's go"
                });

                frameModule.topmost().goBack();
            },
            function (error) {
                this.set("isBusy", false);

                dialogs.alert({
                    title: "Ooops!",
                    message: error.message,
                    okButtonText: "Close"
                });
            });
    }

    public cancel(args: observable.EventData) {
        frameModule.topmost().goBack();
    }
}

export var vm = new RegisterViewModel();