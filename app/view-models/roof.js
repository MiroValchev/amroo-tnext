var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
var roof = require("../models/roof");
var RoofViewModel = (function (_super) {
    __extends(RoofViewModel, _super);
    function RoofViewModel() {
        _super.call(this);
        // Initialize default values.
        this.roof = new roof.Roof();
        this.roof.Title = "Test Tech0";
        this.roof.Type = "House";
        this.roof.PetType = "Dogs only";
        this.roof.Address = "Evlogy Georgiev 70, Sofia, BG";
        this.roof.Picture = "https://bs2.cdn.telerik.com/v1/YNZsLqeVIQYNKrPr/aae95a00-5774-11e4-b392-a1a12513db8b";
        this.roof.Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    }
    RoofViewModel.prototype.GetRoof = function () {
    };
    return RoofViewModel;
})(observable.Observable);
exports.RoofViewModel = RoofViewModel;
exports.roofVM = new RoofViewModel();
//# sourceMappingURL=roof.js.map