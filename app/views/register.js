var viewModel = require("../view-models/register");
function onNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = viewModel.vm;
}
exports.onNavigatedTo = onNavigatedTo;
//# sourceMappingURL=register.js.map