var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var SideBar = (function (_super) {
    __extends(SideBar, _super);
    function SideBar() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SideBar.prototype, "slideContentWidth", {
        get: function () {
            return this._getValue(SideBar.slideContentWidthProperty);
        },
        set: function (value) {
            this._setValue(SideBar.slideContentWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideBar.prototype, "slideContent", {
        get: function () {
            return this._getValue(SideBar.slideContentProperty);
        },
        set: function (value) {
            this._setValue(SideBar.slideContentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideBar.prototype, "mainContent", {
        get: function () {
            return this._getValue(SideBar.mainContentProperty);
        },
        set: function (value) {
            this._setValue(SideBar.mainContentProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    SideBar.prototype.openSlideContent = function () {
        //
    };
    SideBar.prototype.closeSlideContent = function () {
        //
    };
    Object.defineProperty(SideBar.prototype, "_childrenCount", {
        get: function () {
            var count = 0;
            if (this.slideContent) {
                count++;
            }
            if (this.mainContent) {
                count++;
            }
            return count;
        },
        enumerable: true,
        configurable: true
    });
    SideBar.prototype._eachChildView = function (callback) {
        if (this.mainContent) {
            callback(this.mainContent);
        }
        if (this.slideContent) {
            callback(this.slideContent);
        }
    };
    SideBar.slideContentWidthProperty = new dependencyObservable.Property("slideContentWidth", "SideBar", new proxy.PropertyMetadata(280, dependencyObservable.PropertyMetadataSettings.AffectsLayout));
    SideBar.slideContentProperty = new dependencyObservable.Property("slideContent", "SideBar", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout));
    SideBar.mainContentProperty = new dependencyObservable.Property("mainContent", "SideBar", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout));
    return SideBar;
})(view.View);
exports.SideBar = SideBar;
//# sourceMappingURL=side-bar-common.js.map