var viewModel = require("../view-models/profile");
var frame = require("ui/frame");
function onNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = new viewModel.ProfileViewModel();
}
exports.onNavigatedTo = onNavigatedTo;
function back(args) {
    frame.topmost().goBack();
}
exports.back = back;
//# sourceMappingURL=profile.js.map