var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var common = require("./side-bar-common");
var view = require("ui/core/view");
var contentView = require("ui/content-view");
var frame = require("ui/frame");
var utils = require("utils/utils");
function onMainContentPropertyChanged(data) {
    var bar = data.object;
    var newContent = data.newValue;
    if (newContent instanceof view.View) {
        bar._mainContentHost.content = newContent;
    }
}
common.SideBar.mainContentProperty.metadata.onSetNativeValue = onMainContentPropertyChanged;
function onSlideContentPropertyChanged(data) {
    var bar = data.object;
    var newContent = data.newValue;
    if (newContent instanceof view.View) {
        bar._slideContentHost.content = newContent;
    }
}
common.SideBar.slideContentProperty.metadata.onSetNativeValue = onSlideContentPropertyChanged;
var SideBarContent = (function (_super) {
    __extends(SideBarContent, _super);
    function SideBarContent(bar) {
        _super.call(this);
        this._bar = bar;
    }
    SideBarContent.prototype.requestLayout = function () {
        _super.prototype.requestLayout.call(this);
        this._bar.requestLayout();
    };
    return SideBarContent;
})(contentView.ContentView);
var SideBar = (function (_super) {
    __extends(SideBar, _super);
    function SideBar() {
        _super.call(this);
        this._mainContentHost = new SideBarContent(this);
        this._slideContentHost = new contentView.ContentView();
        this._ios = TKSideDrawer.alloc().initWithHostview(this._mainContentHost.ios);
        this._ios.style.blurType = 0;
        this._ios.content = this._slideContentHost.ios;
        this._ios.headerView = null;
        this._ios.footerView = null;
    }
    Object.defineProperty(SideBar.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SideBar.prototype, "_nativeView", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    SideBar.prototype.openSlideContent = function () {
        this.ios.show();
    };
    SideBar.prototype.closeSlideContent = function () {
        // Workaround for strange overlapping issue with TKSideDrawer when dismiss method is called.
        this._slideContentHost.visibility = "collapsed";
        this.ios.dismiss();
        var that = this;
        setTimeout(function () {
            that._slideContentHost.visibility = "visible";
        }, 1000);
    };
    SideBar.prototype.onLoaded = function () {
        this.parent._addView(this._mainContentHost);
        this._addView(this._slideContentHost);
        _super.prototype.onLoaded.call(this);
        this.ios.viewController = frame.topmost().currentPage.ios;
    };
    SideBar.prototype.onUnloaded = function () {
        this.parent._removeView(this._mainContentHost);
        this._removeView(this._slideContentHost);
        _super.prototype.onUnloaded.call(this);
    };
    SideBar.prototype._onBindingContextChanged = function (oldValue, newValue) {
        _super.prototype._onBindingContextChanged.call(this, oldValue, newValue);
        if (this._mainContentHost instanceof view.View) {
            this._mainContentHost.bindingContext = this.bindingContext;
        }
        if (this._slideContentHost instanceof view.View) {
            this._slideContentHost.bindingContext = this.bindingContext;
        }
    };
    SideBar.prototype.onLayout = function (left, top, right, bottom) {
        var width = right - left;
        var height = bottom - top;
        this._slideContentHost.layout(0, 0, this.slideContentWidth, height);
        this._mainContentHost.layout(0, 0, width, height);
    };
    SideBar.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        view.View.measureChild(this, this._slideContentHost, utils.layout.makeMeasureSpec(this.slideContentWidth, utils.layout.EXACTLY), heightMeasureSpec);
        var result = view.View.measureChild(this, this._mainContentHost, widthMeasureSpec, heightMeasureSpec);
        var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);
        var widthAndState = view.View.resolveSizeAndState(result.measuredWidth, width, widthMode, 0);
        var heightAndState = view.View.resolveSizeAndState(result.measuredHeight, height, heightMode, 0);
        this.setMeasuredDimension(widthAndState, heightAndState);
    };
    return SideBar;
})(common.SideBar);
exports.SideBar = SideBar;
//# sourceMappingURL=side-bar.ios.js.map