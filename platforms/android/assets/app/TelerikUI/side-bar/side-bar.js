var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("./side-bar-common");
var view = require("ui/core/view");
var utils = require("utils/utils");
function onMainContentPropertyChanged(data) {
    var bar = data.object;
    var newContent = data.newValue;
    if (bar.android && newContent instanceof view.View) {
        bar.android.setMainContent(newContent.android);
    }
}
common.SideBar.mainContentProperty.metadata.onSetNativeValue = onMainContentPropertyChanged;
function onSlideContentPropertyChanged(data) {
    var bar = data.object;
    var newContent = data.newValue;
    if (bar.android && newContent instanceof view.View) {
        bar.android.setDrawerContent(newContent.android);
    }
}
common.SideBar.slideContentProperty.metadata.onSetNativeValue = onSlideContentPropertyChanged;
function onSlideContentWidthPropertyChanged(data) {
    var bar = data.object;
    if (bar.android) {
        bar.android.setDrawerSize(utils.layout.getDisplayDensity() * data.newValue);
    }
}
common.SideBar.slideContentWidthProperty.metadata.onSetNativeValue = onSlideContentWidthPropertyChanged;
var SideBar = (function (_super) {
    __extends(SideBar, _super);
    function SideBar() {
        _super.apply(this, arguments);
    }
    SideBar.prototype._createUI = function () {
        this._android = new com.telerik.android.primitives.widget.sidedrawer.RadSideDrawer(this._context);
        this._android.setDrawerSize(utils.layout.getDisplayDensity() * 280);
        if (this.mainContent instanceof view.View) {
            this._addView(this.mainContent);
        }
        if (this.slideContent instanceof view.View) {
            this._addView(this.slideContent);
        }
    };
    SideBar.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
        if (this.mainContent instanceof view.View) {
            this._removeView(this.mainContent);
        }
        if (this.slideContent instanceof view.View) {
            this._removeView(this.slideContent);
        }
    };
    Object.defineProperty(SideBar.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    SideBar.prototype._onBindingContextChanged = function (oldValue, newValue) {
        _super.prototype._onBindingContextChanged.call(this, oldValue, newValue);
        if (this.mainContent instanceof view.View) {
            this.mainContent.bindingContext = this.bindingContext;
        }
        if (this.slideContent instanceof view.View) {
            this.slideContent.bindingContext = this.bindingContext;
        }
    };
    SideBar.prototype.openSlideContent = function () {
        this.android.setIsOpen(true);
    };
    SideBar.prototype.closeSlideContent = function () {
        this.android.setIsOpen(false);
    };
    return SideBar;
})(common.SideBar);
exports.SideBar = SideBar;
//# sourceMappingURL=side-bar.android.js.map