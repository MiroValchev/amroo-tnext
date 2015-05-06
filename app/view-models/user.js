var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var base = require("../models/base-entity");

var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.call(this);
        // Initialize default values.
    }
    return User;
})(base.BaseEntity);
exports.User = User;
//# sourceMappingURL=user.js.map
