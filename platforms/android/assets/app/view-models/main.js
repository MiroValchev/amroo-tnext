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
var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        _super.call(this);
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
    Object.defineProperty(MainViewModel.prototype, "roofItems", {
        get: function () {
            console.log("Getting roof items ... ");
            var that = this;
            if (!that._roofItems) {
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
                    data.get(query).then(function (data) {
                        that.set("isBusy", false);
                        console.log("Received roofs");
                        that._roofItems.load(args.index, data.result);
                    }, function (error) {
                        that.set("isBusy", false);
                        console.log(error.message);
                        alert(error.message);
                    });
                });
            }
            return that._roofItems;
        },
        enumerable: true,
        configurable: true
    });
    MainViewModel.prototype.showRoof = function (args) {
        frame.topmost().navigate({
            moduleName: "/views/roof",
            context: this._roofItems.getItem(args.index)
        });
    };
    MainViewModel.prototype.addRoof = function (args) {
        frame.topmost().navigate({
            moduleName: "/views/add-roof"
        });
    };
    MainViewModel.prototype.addPet = function (args) {
        frame.topmost().navigate({
            moduleName: "/views/add-pet"
        });
    };
    MainViewModel.prototype.showSearch = function (args) {
        frame.topmost().navigate({
            moduleName: "/views/search"
        });
    };
    MainViewModel.prototype.showProfile = function (args) {
        frame.topmost().navigate({
            moduleName: "/views/profile"
        });
    };
    MainViewModel.prototype.logout = function (args) {
        localSettings.remove(global.TOKEN_DATA_KEY);
        frame.topmost().navigate("./views/login");
    };
    return MainViewModel;
})(observable.Observable);
exports.MainViewModel = MainViewModel;
exports.vm = new MainViewModel();
//# sourceMappingURL=main.js.map