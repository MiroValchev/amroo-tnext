var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
var localSettings = require("local-settings");
var everlive = require("../lib/everlive");
var frameModule = require("ui/frame");
var PetViewModel = (function (_super) {
    __extends(PetViewModel, _super);
    function PetViewModel() {
        _super.call(this);
        // Initialize default values.           
        this._el = new everlive({
            apiKey: global.TELERIK_BAAS_KEY,
            token: localSettings.getString(global.TOKEN_DATA_KEY)
        });
    }
    Object.defineProperty(PetViewModel.prototype, "petItems", {
        get: function () {
            if (!this._petItems) {
                this._petItems = new Array();
                console.log("Getting pet items ... ");
                var that = this;
                var data = that._el.data("Pets");
                var query = new everlive.Query();
                //query.skip(args.index.toString()).take(args.count.toString());
                data.get(query).then(function (data) {
                    console.log("Received pets");
                    that.petItems = data.result;
                }, function (error) {
                    console.log(error.message);
                    alert(error.message);
                });
            }
            return this._petItems;
        },
        set: function (value) {
            if (this._petItems !== value) {
                this._petItems = value;
                this.notify({ object: this, eventName: observable.knownEvents.propertyChange, propertyName: "petItems", value: value });
            }
        },
        enumerable: true,
        configurable: true
    });
    PetViewModel.prototype.showPet = function (args) {
        frameModule.topmost().navigate({
            moduleName: "/views/pet",
            context: this.petItems[args.index]
        });
    };
    return PetViewModel;
})(observable.Observable);
exports.PetViewModel = PetViewModel;
exports.vm = new PetViewModel();
//# sourceMappingURL=pets.js.map