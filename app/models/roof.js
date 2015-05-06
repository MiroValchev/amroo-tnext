var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var base = require("../models/base-entity");
var everlive = require("../lib/everlive");
var Roof = (function (_super) {
    __extends(Roof, _super);
    function Roof() {
        _super.call(this);
        // Initialize default values.
        this.IsAvailable = true;
    }
    return Roof;
})(base.BaseEntity);
exports.Roof = Roof;
//# sourceMappingURL=roof.js.map