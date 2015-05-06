import observable = require("data/observable");
import observableArray = require("data/observable-array");
import virtualArray = require("data/virtual-array");
import roofModel = require("../models/roof");
import localSettings = require("local-settings");
var everlive = require("../lib/everlive");
import gestures = require("ui/gestures");
import frame = require("ui/frame");
import listView = require("ui/list-view");
import enums = require("../models/enums");

export class SearchViewModel extends observable.Observable {
    private _el: any;//everlive;
    private _roofItems: virtualArray.VirtualArray<roofModel.Roof>;

    public visibleFilters: boolean;
    public searchQuery: string;
    public filters: any;
    public isBusy: boolean;
    public actionBarTitle: string;

    constructor() {
        super();
        // Initialize default values.   

        this._el = new everlive({
            apiKey: global.TELERIK_BAAS_KEY,
            token: localSettings.getString(global.TOKEN_DATA_KEY)
        });

        this.visibleFilters = false;

        //You can still do things like these in TS
        //Even though people will be givin you bad looks
        this.filters = {
            pets: {
                all: true,
                cats: true,
                dogs: true
            },
            roofs: {
                apartment: true,
                house: true,
                hotel: true
            },
        }

        this.actionBarTitle = "Search";
    }

    public back(args: observable.EventData) {
        if (!this.visibleFilters){
            frame.topmost().goBack();
        } else {
            this.hideFilters(args);
        }        
    }

    get roofItems(): virtualArray.VirtualArray<roofModel.Roof> {
        console.log("Getting roof items ... ");
        var that = this;

        if (!that._roofItems) {
            this._setRoofItems();
        }

        return that._roofItems;
    }

    /**
    * Sets the virtual array items and filters data by the provided search query.
    */
    private _setRoofItems() {
        var that = this;
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
            that.set("isBusy", true);
            console.log("Requesting more roofs");
            
            var query = new everlive.Query();
            var myWhere = query.where().eq('IsAvailable', true);
            
            if (that.searchQuery) {
                myWhere.startsWith('City', that.searchQuery.trim());                               
            }

            if (!that.filters.pets.all) {
                myWhere.ne("PetType", enums.RoofPetsType.All);
            }
            if (!that.filters.pets.cats) {
                myWhere.ne("PetType", enums.RoofPetsType.Cats);
            }
            if (!that.filters.pets.dogs) {
                myWhere.ne("PetType", enums.RoofPetsType.Dogs);
            }

            if (!that.filters.roofs.apartment) {
                myWhere.ne("Type", enums.RoofType.Apartment);
            }
            if (!that.filters.roofs.house) {
                myWhere.ne("Type", enums.RoofType.House);
            }
            if (!that.filters.roofs.hotel) {
                myWhere.ne("Type", enums.RoofType.Hotel);
            }
                        
            query.skip(args.index.toString()).take(args.count.toString());

            data.get(query).then(
                function (data) {
                    that.set("isBusy", false);
                    console.log("Received roofs " + data.result.length);                    
                    if (data.result.length) {
                        that._roofItems.load(args.index, data.result);
                    } else {
                        if (!args.index) {
                            alert("No results");
                        }
                    }
                },
                function (error) {
                    that.set("isBusy", false);
                    console.log(error.message);
                    alert(error.message);
                });
        });

        that.notify({ object: this, eventName: observable.knownEvents.propertyChange, propertyName: "roofItems", value: that._roofItems });
    }

    public showRoof(args: listView.ItemEventData) {
        frame.topmost().navigate({
            moduleName: "/views/roof",
            context: this.roofItems.getItem(args.index)
        });
    }

    public showFilters(args: gestures.GestureEventData) {
        this.set("actionBarTitle", "Filters");
        this.set("visibleFilters", true);
    }

    public hideFilters(args: any) {
        this.set("actionBarTitle", "Search");
        this.set("visibleFilters", false);
        this._setRoofItems();
    }

    public search(args: observable.EventData) {
        this._setRoofItems();
    }
}

export var vm = new SearchViewModel();