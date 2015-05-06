var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var base = require("../models/base-entity");
var Pet = (function (_super) {
    __extends(Pet, _super);
    function Pet() {
        _super.call(this);
        // Initialize default values.
    }
    return Pet;
})(base.BaseEntity);
exports.Pet = Pet;
//# sourceMappingURL=pet.js.map