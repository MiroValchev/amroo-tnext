var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var base = require("../models/base-entity");
var everlive = require("../lib/everlive");
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.call(this);
        // Initialize default values.
    }
    return User;
})(base.BaseEntity);
exports.User = User;
var UserExt = (function (_super) {
    __extends(UserExt, _super);
    function UserExt() {
        _super.apply(this, arguments);
    }
    return UserExt;
})(User);
exports.UserExt = UserExt;
//# sourceMappingURL=user.js.map