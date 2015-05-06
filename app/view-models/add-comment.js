var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable = require("data/observable");
var everlive = require("../lib/everlive");
var roof = require("../models/roof");
var AddCommentViewModel = (function (_super) {
    __extends(AddCommentViewModel, _super);
    function AddCommentViewModel() {
        _super.call(this);
        // Initialize default values.
        this._activePanelId = "roofTitle";
    }
    Object.defineProperty(AddCommentViewModel.prototype, "roof", {
        get: function () {
            if (!this._roof) {
                this._roof = new roof.Roof();
            }
            return this._roof;
        },
        set: function (value) {
            this._roof = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddCommentViewModel.prototype, "activePanelId", {
        get: function () {
            return this._activePanelId;
        },
        set: function (value) {
            this._activePanelId = value;
            this.notify({ object: this, eventName: observable.knownEvents.propertyChange, propertyName: "activePanelId", value: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddCommentViewModel.prototype, "roofTypes", {
        get: function () {
            if (!this._roofTypes) {
                this._roofTypes.push({ "key": "1", "text": "House" });
                this._roofTypes.push({ "key": "2", "text": "Apartment" });
                this._roofTypes.push({ "key": "3", "text": "Hotel" });
            }
            return this._roofTypes;
        },
        enumerable: true,
        configurable: true
    });
    AddCommentViewModel.prototype.nextView = function (args) {
        var btn = args.object;
        this.activePanelId = btn.id;
    };
    return AddCommentViewModel;
})(observable.Observable);
exports.AddCommentViewModel = AddCommentViewModel;
exports.vm = new AddCommentViewModel();
//# sourceMappingURL=add-comment.js.map