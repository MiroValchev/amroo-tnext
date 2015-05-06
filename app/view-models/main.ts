import observable = require("data/observable");
import observableArray = require("data/observable-array");
import virtualArray = require("data/virtual-array");
import roofModel = require("../models/roof");
import localSettings = require("local-settings");
var everlive = require("../lib/everlive");
import frame = require("ui/frame");
import listView = require("ui/list-view");
import testData = require("../view-models/test-data");

export class MainViewModel extends observable.Observable {
    private _el: any;//everlive;
    private _roofItems: virtualArray.VirtualArray<roofModel.Roof>;
    public actionBarTitle: string;
    public isBusy: boolean;

    constructor() {
        super();
        // Initialize default values.   

        //creates test data on the server
        //var test = new testData.TestManager();        
        //test.populateBackend();

        this._el = new everlive({
            apiKey: global.TELERIK_BAAS_KEY,
            token: localSettings.getString(global.TOKEN_DATA_KEY)
        });

        this.actionBarTitle = "Haudi";
    }

    get roofItems(): virtualArray.VirtualArray<roofModel.Roof> {
        console.log("Getting roof items ... ");
        var that = this;

        if (!that._roofItems) {
            var data = that._el.data("Roofs");

            data.count().then(
                function (data) {
                    that._roofItems.length = data.result;
                    console.log("Total roofs count " + data.result);
                },
                function (error) {
                    alert(error.Message);
                });

            that._roofItems = new virtualArray.VirtualArray<roofModel.Roof>(30);
            that._roofItems.loadSize = 10;
            that._roofItems.on(virtualArray.knownEvents.itemsLoading,(args: virtualArray.ItemsLoading) => {
                // Argument (args) is ItemsLoading.
                // args.index is start index of the page where the requested index is located.
                // args.count number of requested items.
                //
                // Note: Virtual array will divide total number of items to pages using "loadSize" property value. When you request an 
                // item at specific index the array will raise "itemsLoading" event with "ItemsLoading" argument index set to the first index of the requested page
                // and count set to number of items in this page. 
                //
                // Important: If you have already loaded items in the requested page the array will raise multiple times "itemsLoading" event to request 
                // all ranges of still not loaded items in this page. 
                console.log("Requesting more roofs");
                that.set("isBusy", true);

                var query = new everlive.Query();
                query.skip(args.index.toString()).take(args.count.toString());
                
                //http.getJSON
                data.get(query).then(
                    function (data) {
                        that.set("isBusy", false);
                        console.log("Received roofs");
                        that._roofItems.load(args.index, data.result);
                    },
                    function (error) {
                        that.set("isBusy", false);
                        console.log(error.message);
                        alert(error.message);
                    });
            });
        }

        return that._roofItems;
    }

    public showRoof(args: listView.ItemEventData) {
        frame.topmost().navigate({
            moduleName: "/views/roof",
            context: this._roofItems.getItem(args.index)
        });
    }

    public addRoof(args: observable.EventData) {
        frame.topmost().navigate({
            moduleName: "/views/add-roof"
        });
    }

    public addPet(args: observable.EventData) {
        frame.topmost().navigate({
            moduleName: "/views/add-pet"
        });
    }

    public showSearch(args: observable.EventData) {
        frame.topmost().navigate({
            moduleName: "/views/search"
        });
    }

    public showProfile(args: observable.EventData) {
        frame.topmost().navigate({
            moduleName: "/views/profile"
        });
    }

    public logout(args: observable.EventData) {
        localSettings.remove(global.TOKEN_DATA_KEY);
        frame.topmost().navigate("./views/login");
    }
}

export var vm = new MainViewModel();