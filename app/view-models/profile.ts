import observable = require("data/observable");
import dialogs = require("ui/dialogs");
import frame = require("ui/frame");
import localSettings = require("local-settings");
var everlive = require("../lib/everlive");
import user = require("models/user");
import listView = require("ui/list-view");

export class ProfileViewModel extends observable.Observable {
    private _el: any;//everlive;
    private _userId: string;

    public user: user.UserExt;
    //these two are currently used due to a bug 
    //in the bindings. i.e. user.Roofs does not notify
    //properly for changes
    public pets;
    public roofs;
    public selectedTab: number;
    public isBusy: boolean;

    constructor() {
        super();

        // Initialize default values.        
        this.userId = localSettings.getString(global.USER_ID);      
        this.selectedTab = 0;  
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

    get userId() {
        return this._userId;
    }

    set userId(value: string) {        
        if (this._userId !== value) {
            this._userId = value;
            var that = this;
            that.set("isBusy", true);

            var expandExp = {
                "Roofs.CreatedBy": {
                    "ReturnAs": "Roofs",
                    "Take": 10 //limit the number of roof returned
                    //http://docs.telerik.com/platform/backend-services/development/javascript-sdk/relations/expanding-with-advanced-parameters
                    //we can also just take fewer fields if needed
                    //"Fields": {
                    //    "DisplayName": 1,
                    //    "Email": 1,
                    //    "Id": 0
                    //}
                },
                "Pets.CreatedBy": {
                    "ReturnAs": "Pets",
                    "Take": 10
                }
            };

            this.el.Users.expand(expandExp).getById(this._userId).then(
                function (data) {
                    console.log("Got user data");
                    that.set("user", data.result);                                        
                    that.set("pets", data.result.Pets);
                    that.set("roofs", data.result.Roofs);

                    that.set("isBusy", false);
                },
                function (error) {
                    that.set("isBusy", false);
                    alert(error.message);                    
                });
        }
    }

    public showPet(args: listView.ItemEventData) {
        frame.topmost().navigate({
            moduleName: "/views/pet",
            context: this.user.Pets[args.index]
        });
    }

    public showRoof(args: listView.ItemEventData) {
        frame.topmost().navigate({
            moduleName: "/views/roof",
            context: this.user.Roofs[args.index]
        });
    }

    public editUser(args: observable.EventData) {        
        frame.topmost().navigate({
            moduleName: "/views/edit-profile",
            context: this.user
        });
    }

    public call(args: observable.EventData) {
        //this.user.PhoneNumber;
    }

    public sendEmail(args: observable.EventData) {
        //this.user.Email;
    }

    public cancel(args: observable.EventData) {
        frame.topmost().goBack();
    }
}

export var vm = new ProfileViewModel();