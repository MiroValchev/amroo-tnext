var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var stackLayoutModule = require("ui/layouts/stack-layout");
var label = require("ui/label");
var button = require("ui/button");
var MyControl = (function (_super) {
    __extends(MyControl, _super);
    function MyControl() {
        _super.call(this);
        var counter = 0;
        var lbl = new label.Label();
        var btn = new button.Button();
        btn.text = "Tap me!";
        btn.on(button.knownEvents.tap, function (args) {
            lbl.text = "Tap " + counter++;
        });
        this.addChild(lbl);
        this.addChild(btn);
    }
    return MyControl;
})(stackLayoutModule.StackLayout);
exports.MyControl = MyControl;
//# sourceMappingURL=MyControl.js.map