var viewModel = require("../view-models/add-roof");
function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = new viewModel.AddRoofViewModel();
}
exports.pageNavigatedTo = pageNavigatedTo;
var frame = require("ui/frame");
function back(args) {
    frame.topmost().goBack();
}
exports.back = back;
//# sourceMappingURL=add-roof.js.map