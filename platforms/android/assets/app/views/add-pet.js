var viewModel = require("../view-models/add-pet");
function pageNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = new viewModel.AddPetViewModel();
}
exports.pageNavigatedTo = pageNavigatedTo;
var frame = require("ui/frame");
function back(args) {
    frame.topmost().goBack();
}
exports.back = back;
//# sourceMappingURL=add-pet.js.map