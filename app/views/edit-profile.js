var viewModel = require("../view-models/edit-profile");
function onNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = viewModel.vm;
    page.bindingContext.setUser(page.navigationContext);
}
exports.onNavigatedTo = onNavigatedTo;
var frame = require("ui/frame");
function back(args) {
    frame.topmost().goBack();
}
exports.back = back;
//# sourceMappingURL=edit-profile.js.map