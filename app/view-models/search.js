var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
var virtualArray = require("data/virtual-array");
var localSettings = require("local-settings");
var everlive = require("../lib/everlive");
var frame = require("ui/frame");
var enums = require("../models/enums");
var SearchViewModel = (function (_super) {
    __extends(SearchViewModel, _super);
    function SearchViewModel() {
        _super.call(this);
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
        };
        this.actionBarTitle = "Search";
    }
    SearchViewModel.prototype.back = function (args) {
        if (!this.visibleFilters) {
            frame.topmost().goBack();
        }
        else {
            this.hideFilters(args);
        }
    };
    Object.defineProperty(SearchViewModel.prototype, "roofItems", {
        get: function () {
            console.log("Getting roof items ... ");
            var that = this;
            if (!that._roofItems) {
                this._setRoofItems();
            }
            return that._roofItems;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Sets the virtual array items and filters data by the provided search query.
    */
    SearchViewModel.prototype._setRoofItems = function () {
        var that = this;
        var data = that._el.data("Roofs");
        data.count().then(function (data) {
            that._roofItems.length = data.result;
            console.log("Total roofs count " + data.result);
        }, function (error) {
            alert(error.Message);
        });
        that._roofItems = new virtualArray.VirtualArray(30);
        that._roofItems.loadSize = 10;
        that._roofItems.on(virtualArray.knownEvents.itemsLoading, function (args) {
            that.set("isBusy", true);
            console.log("Requesting more roofs");
            var query = new everlive.Query();
            var myWhere = query.where().eq('IsAvailable', true);
            if (that.searchQuery) {
                myWhere.startsWith('City', that.searchQuery.trim());
            }
            if (!that.filters.pets.all) {
                myWhere.ne("PetType", 0 /* All */);
            }
            if (!that.filters.pets.cats) {
                myWhere.ne("PetType", 2 /* Cats */);
            }
            if (!that.filters.pets.dogs) {
                myWhere.ne("PetType", 1 /* Dogs */);
            }
            if (!that.filters.roofs.apartment) {
                myWhere.ne("Type", 2 /* Apartment */);
            }
            if (!that.filters.roofs.house) {
                myWhere.ne("Type", 1 /* House */);
            }
            if (!that.filters.roofs.hotel) {
                myWhere.ne("Type", 3 /* Hotel */);
            }
            query.skip(args.index.toString()).take(args.count.toString());
            data.get(query).then(function (data) {
                that.set("isBusy", false);
                console.log("Received roofs " + data.result.length);
                if (data.result.length) {
                    that._roofItems.load(args.index, data.result);
                }
                else {
                    if (!args.index) {
                        alert("No results");
                    }
                }
            }, function (error) {
                that.set("isBusy", false);
                console.log(error.message);
                alert(error.message);
            });
        });
        that.notify({ object: this, eventName: observable.knownEvents.propertyChange, propertyName: "roofItems", value: that._roofItems });
    };
    SearchViewModel.prototype.showRoof = function (args) {
        frame.topmost().navigate({
            moduleName: "/views/roof",
            context: this.roofItems.getItem(args.index)
        });
    };
    SearchViewModel.prototype.showFilters = function (args) {
        this.set("actionBarTitle", "Filters");
        this.set("visibleFilters", true);
    };
    SearchViewModel.prototype.hideFilters = function (args) {
        this.set("actionBarTitle", "Search");
        this.set("visibleFilters", false);
        this._setRoofItems();
    };
    SearchViewModel.prototype.search = function (args) {
        this._setRoofItems();
    };
    return SearchViewModel;
})(observable.Observable);
exports.SearchViewModel = SearchViewModel;
exports.vm = new SearchViewModel();
//# sourceMappingURL=search.js.map